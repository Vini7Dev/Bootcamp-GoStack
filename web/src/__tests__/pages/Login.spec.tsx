import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Login from '../../pages/Login';

const mockedHistoryPush = jest.fn();
const mockedLogin = jest.fn();
const mockedAddToast = jest.fn();

jest.mock('react-router-dom', () => {
    return {
        Link: ({children}: { children: React.ReactNode }) => children,
        useHistory: () => ({
            push: mockedHistoryPush
        })
    };
});

jest.mock('../../hooks/auth', () => {
    return {
        useAuth: () => ({
            login: mockedLogin
        })
    }
});

jest.mock('../../hooks/toast', () => {
    return {
        useToast: () => ({
            addToast: mockedAddToast
        })
    }
});

describe('Login Page', () => {
    beforeEach(() => {
        mockedHistoryPush.mockClear();
    });

    it('should be able to login', async () => {
        const { getByPlaceholderText, getByText } = render(<Login />);

        const emailInput = getByPlaceholderText('E-mail');
        const passwordInput = getByPlaceholderText('Senha');
        const loginButton = getByText('Entrar');

        fireEvent.change(emailInput, { target: { value: 'example@email.com' } });
        fireEvent.change(passwordInput, { target: { value: '123456' } });
        fireEvent.click(loginButton);

        await waitFor(() => {
            expect(mockedHistoryPush).toHaveBeenCalledWith('/');
        });
    });

    it('shoud not be able to login with invalid credentias', async () => {
        const { getByPlaceholderText, getByText } = render(<Login />);

        const emailInput = getByPlaceholderText('E-mail');
        const passwordInput = getByPlaceholderText('Senha');
        const loginButton = getByText('Entrar');

        fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
        fireEvent.change(passwordInput, { target: { value: '123456' } });
        fireEvent.click(loginButton);

        await waitFor(() => {
            expect(mockedHistoryPush).not.toHaveBeenCalled();
        });
    });

    it('shoud display error in login fails', async () => {
        mockedLogin.mockImplementation(() => {
            throw new Error();
        });

        const { getByPlaceholderText, getByText } = render(<Login />);

        const emailInput = getByPlaceholderText('E-mail');
        const passwordInput = getByPlaceholderText('Senha');
        const loginButton = getByText('Entrar');

        fireEvent.change(emailInput, { target: { value: 'example@email.com' } });
        fireEvent.change(passwordInput, { target: { value: '123456' } });
        fireEvent.click(loginButton);

        await waitFor(() => {
            expect(mockedAddToast).toHaveBeenCalledWith(
                expect.objectContaining({
                    type: 'error'
                })
            );
        });
    });
});