import React, { useCallback, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Content, Background, AnimationContainer } from './styles';

import { useToast } from '../../hooks/toast';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { FiLock } from 'react-icons/fi';
import logo from '../../assets/logo.svg';
import api from '../../services/api';

interface ResetPasswordFormData {
    password: string;
    password_confirmation: string;
}

const ResetPassword: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const history = useHistory();
    const location = useLocation();

    const { addToast } = useToast();

    const handleLogin = useCallback(async (data: ResetPasswordFormData) => {
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                password: Yup.string().required('A senha é obrigatória!'),
                password_confirmation: Yup.string().oneOf(
                    [Yup.ref('password')], 'A confirmação deve ser igual a nova senha.'
                )
            });

            await schema.validate(data, { abortEarly: false });

            const token = location.search.replace('?token=', '');

            if(!token) {
                throw new Error('Token does not exists.');
            }

            await api.post('/password/reset', {
                password: data.password,
                password_confirmation: data.password_confirmation,
                token
            });

            history.push('/');
        } catch(err) {
            if(err instanceof Yup.ValidationError){
                const errors = getValidationErrors(err);

                formRef.current?.setErrors(errors);
            }
            
            addToast({
                type: 'error',
                title: 'Erro ao resetar a senha!',
                description: 'Ocorreu um erro ao tentar efetuar resetar sua senha, cheque as credenciais.'
            });
        }
    }, [addToast, history, location.search]);

    return (
        <Container>
            <Content>
                <AnimationContainer>
                    <img src={logo} alt="Go Barber"/>

                    <Form ref={formRef} onSubmit={handleLogin}>
                        <h1>Resetar senha</h1>

                        <Input icon={FiLock} name="password" type="password" placeholder="Nova Senha"/>
                        <Input icon={FiLock} name="password_confirmation" type="password" placeholder="Confirmação da senha"/>

                        <Button type="submit">Alterar a senha</Button>
                    </Form>
                </AnimationContainer>
            </Content>

            <Background />
        </Container>
    );

};

export default ResetPassword;