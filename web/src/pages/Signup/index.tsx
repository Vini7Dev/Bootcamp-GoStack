import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { FiUser, FiMail, FiLock, FiArrowLeft } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import getValidationErrors from '../../utils/getValidationErrors';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import { Container, Content, Background, AnimationContainer } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logo from '../../assets/logo.svg';

interface SignupData {
    name: string;
    emal: string;
    password: string;
}

const Signup: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();

    const handleSubmit = useCallback(async (data: SignupData) => {
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                name: Yup.string().required('O nome é obrigatório!'),
                email: Yup.string().required('O e-mail é obrigatório!').email('Informe um e-mail válido!'),
                password: Yup.string().min(6, 'Informe pelomenos 6 caracteres!')
            });

            await schema.validate(data, { abortEarly: false });

            await api.post('users', data);

            addToast({
                type: 'success',
                title: 'Cadastro realizado com sucesso!',
                description: 'Você ja pode realizar sei login na tela inicial.'
            });

            history.push('/');
        } catch(err) {
            if(err instanceof Yup.ValidationError){
                const errors = getValidationErrors(err);

                formRef.current?.setErrors(errors);
            }
            
            addToast({
                type: 'error',
                title: 'Erro no cadastro!',
                description: 'Ocorreu um erro ao tentar efetuar o cadastro, cheque as credenciais.'
            });
        }
    }, [addToast, history]);

    return (
        <Container>
            <Background />

            <Content>
                <AnimationContainer>
                    <img src={logo} alt="Go Barber"/>
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Faça seu cadastro</h1>

                        <Input icon={FiUser} name="name" placeholder="Nome" />
                        <Input icon={FiMail} name="email" placeholder="E-mail" />
                        <Input icon={FiLock} name="password" type="password" placeholder="Senha"/>

                        <Button type="submit">Cadastrar</Button>
                    </Form>

                    <Link to="/">
                        <FiArrowLeft />
                        Voltar para o login
                    </Link>
                </AnimationContainer>
            </Content>
        </Container>
    );
};

export default Signup;