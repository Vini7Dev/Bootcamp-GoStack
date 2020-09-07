import React, { useCallback, useRef } from 'react';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Content, Background } from './styles';

import { useAuth } from '../../context/AuthContext';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import logo from '../../assets/logo.svg';

interface LoginFormData {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { login } = useAuth();

    const handleLogin = useCallback(async (data: LoginFormData) => {
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                email: Yup.string().required('O e-mail é obrigatório!').email('Informe um e-mail válido!'),
                password: Yup.string().required('A senha é obrigatória!')
            });

            await schema.validate(data, { abortEarly: false });

            login(data);
        } catch(err) {
            const errors = getValidationErrors(err);

            formRef.current?.setErrors(errors);
        }
    }, []);

    return (
        <Container>
            <Content>
                <img src={logo} alt="Go Barber"/>
                <Form ref={formRef} onSubmit={handleLogin}>
                    <h1>Faça seu login</h1>

                    <Input icon={FiMail} name="email" placeholder="E-mail" />
                    <Input icon={FiLock} name="password" type="password" placeholder="Senha"/>
                    <Button type="submit">Entrar</Button>

                    <a href="#">Esqueci a senha</a>
                </Form>


                <a href="#">
                    <FiLogIn />
                    Criar conta
                </a>
            </Content>

            <Background />
        </Container>
    );

};

export default Login;