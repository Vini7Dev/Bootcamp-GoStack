import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';

import Input from '../../components/Input';

jest.mock('@unform/core', () => {
    return {
        useField() {
            return {
                fieldName: 'email',
                defaultValue: '',
                error: '',
                registerField: jest.fn()
            }
        }
    }
});

describe('Input - Component', () => {
    it('should be able to render an input', () => {
        const { getByPlaceholderText } = render(<Input name="email" placeholder="E-mail" />);

        expect(getByPlaceholderText('E-mail')).toBeTruthy();
    });

    it('should render highlight on input focus', async () => {
        const { getByPlaceholderText, getByTestId } = render(<Input name="email" placeholder="E-mail" />)

        const inputElement = getByPlaceholderText('E-mail');
        const inputContainer = getByTestId('input-container');

        fireEvent.focus(inputElement);

        await waitFor(() => {
            expect(inputContainer).toHaveStyle('border-color: #FF9000');
            expect(inputContainer).toHaveStyle('color: #FF9000');
        });

        fireEvent.blur(inputElement);

        await waitFor(() => {
            expect(inputContainer).not.toHaveStyle('border-color: #FF9000');
            expect(inputContainer).not.toHaveStyle('color: #FF9000');
        });
    });

    it('should keep input border highlight qhen input fielled', async () => {
        const { getByPlaceholderText, getByTestId } = render(<Input name="email" placeholder="E-mail" />)

        const inputElement = getByPlaceholderText('E-mail');
        const inputContainer = getByTestId('input-container');

        fireEvent.change(inputElement, { target: { value: 'example@email.com' } });

        fireEvent.blur(inputElement);

        await waitFor(() => {
            expect(inputContainer).toHaveStyle('color: #FF9000');
        });
    });
});