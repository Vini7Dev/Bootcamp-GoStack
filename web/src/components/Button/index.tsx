import React, { ButtonHTMLAttributes } from 'react';
import { boolean } from 'yup';

import { ButtonContainer } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    loading?: boolean
};

const Button: React.FC<ButtonProps> = ({ children, loading, type, ...rest }) => (
    <ButtonContainer type={type} {...rest}>
        {loading ? 'Carregando...' :children}
    </ButtonContainer>
);

export default Button;