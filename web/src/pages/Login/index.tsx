import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Content, Background, AnimationContainer } from './styles';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

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
    const history = useHistory();
    const { login } = useAuth();
    const { addToast } = useToast();

    const handleLogin = useCallback(async (data: LoginFormData) => {
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                email: Yup.string().required('O e-mail é obrigatório!').email('Informe um e-mail válido!'),
                password: Yup.string().required('A senha é obrigatória!')
            });

            await schema.validate(data, { abortEarly: false });

            login(data);

            history.push('/');
        } catch(err) {
            if(err instanceof Yup.ValidationError){
                const errors = getValidationErrors(err);

                formRef.current?.setErrors(errors);
            }
            
            addToast({
                type: 'error',
                title: 'Erro na autenticação!',
                description: 'Ocorreu um erro ao tentar efetuar o login, cheque as credenciais.'
            });
        }
    }, [login, addToast, history]);

    return (
        <Container>
            <Content>
                <AnimationContainer>
                    <img src={logo} alt="Go Barber"/>
                    <Form ref={formRef} onSubmit={handleLogin}>
                        <h1>Faça seu login</h1>

                        <Input icon={FiMail} name="email" placeholder="E-mail" />
                        <Input icon={FiLock} name="password" type="password" placeholder="Senha"/>
                        <Button type="submit">Entrar</Button>

                        <a href="#">Esqueci a senha</a>
                    </Form>


                    <Link to="/signup">
                        <FiLogIn />
                        Criar conta
                    </Link>
                </AnimationContainer>
            </Content>

            <Background />
        </Container>
    );

};

export default Login;