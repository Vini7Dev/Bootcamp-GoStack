import React, { useCallback, useRef } from 'react';
import * as Yup from 'yup';
import { FiUser, FiMail, FiLock, FiArrowLeft } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Content, Background } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logo from '../../assets/logo.svg';

const Signup: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const handleSubmit = useCallback(async (data: object) => {
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                name: Yup.string().required('O nome é obrigatório!'),
                email: Yup.string().required('O e-mail é obrigatório!').email('Informe um e-mail válido!'),
                password: Yup.string().min(6, 'Informe pelomenos 6 caracteres!')
            });
            await schema.validate(data, { abortEarly: false });
        } catch(err) {
            const errors = getValidationErrors(err);

            formRef.current?.setErrors(errors);
        }
    }, []);

    return (
        <Container>
            <Background />

            <Content>
                <img src={logo} alt="Go Barber"/>
                <Form ref={formRef} onSubmit={handleSubmit}>
                    <h1>Faça seu cadastro</h1>

                    <Input icon={FiUser} name="name" placeholder="Nome" />
                    <Input icon={FiMail} name="email" placeholder="E-mail" />
                    <Input icon={FiLock} name="password" type="password" placeholder="Senha"/>

                    <Button type="submit">Cadastrar</Button>
                </Form>

                <a href="#">
                    <FiArrowLeft />
                    Voltar para o login
                </a>
            </Content>
        </Container>
    );
};

export default Signup;