import React, { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Content, Background, AnimationContainer } from './styles';

import { useToast } from '../../hooks/toast';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import logo from '../../assets/logo.svg';
import api from '../../services/api';

interface ForgotPasswordFormData {
    email: string;
}

const ForgotPassword: React.FC = () => {
    const [loading, setLoading] = useState(false);

    const formRef = useRef<FormHandles>(null);

    const { addToast } = useToast();

    const handleLogin = useCallback(async (data: ForgotPasswordFormData) => {
        try {
            setLoading(true);

            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                email: Yup.string().required('O e-mail é obrigatório!').email('Informe um e-mail válido!'),
            });

            await schema.validate(data, { abortEarly: false });

            await api.post('/password/forgot', {
                email: data.email
            });

            addToast({
                type: 'success',
                title: 'E-mail de recuperação enviado!',
                description: 'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada.'
            });
        } catch(err) {
            if(err instanceof Yup.ValidationError){
                const errors = getValidationErrors(err);

                formRef.current?.setErrors(errors);
            }
            
            addToast({
                type: 'error',
                title: 'Erro na recuperação de senha!',
                description: 'Ocorreu um erro ao tentar efetuar a recuperação da senha, cheque as credenciais.'
            });
        } finally {
            setLoading(false);
        }
    }, [addToast]);

    return (
        <Container>
            <Content>
                <AnimationContainer>
                    <img src={logo} alt="Go Barber"/>
                    <Form ref={formRef} onSubmit={handleLogin}>
                        <h1>Recuperar senha</h1>

                        <Input icon={FiMail} name="email" placeholder="E-mail" />

                        <Button loading={loading} type="submit">Recuperar</Button>
                    </Form>


                    <Link to="/">
                        <FiLogIn />
                        Voltar ao login
                    </Link>
                </AnimationContainer>
            </Content>

            <Background />
        </Container>
    );

};

export default ForgotPassword;