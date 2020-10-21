import React, { ChangeEvent, useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { FiUser, FiMail, FiLock, FiCamera, FiArrowLeft } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import getValidationErrors from '../../utils/getValidationErrors';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import { Container, Content, AvatarInput } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth';

interface User {
    id: string;
    name: string;
    email: string;
    avatar_url: string;
}

interface ProfileData {
    name: string;
    email: string;
    old_password: string;
    password: string;
    password_confirmation: string;
}

const Profile: React.FC = () => {
    const { user, updateUser } = useAuth();

    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();

    const handleSubmit = useCallback(async (data: ProfileData) => {
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                name: Yup.string().required('O nome é obrigatório!'),
                email: Yup.string().required('O e-mail é obrigatório!').email('Informe um e-mail válido!'),
                old_password: Yup.string(),
                password: Yup.string()
                    .when('old_password', {
                        is: value => !!value.length,
                        then: Yup.string().required('Campo obrigatório!'),
                        otherwise: Yup.string()
                    }),
                password_confirmation: Yup.string()
                    .when('old_password', {
                        is: value => !!value.length,
                        then: Yup.string().required('Campo obrigatório!'),
                        otherwise: Yup.string()
                    })
                        .oneOf(
                        [Yup.ref('password')], 'Confirmação incorreta!'
                    )
            });

            await schema.validate(data, { abortEarly: false });

            const formData = Object.assign({
                name: data.name,
                email: data.email
            }, data.old_password ? {
                old_password: data.old_password,
                password: data.password,
                password_confirmation: data.password_confirmation
            } : {}
            );

            const updatedProfileResponse = await api.put('/profile', formData);

            updateUser(updatedProfileResponse.data);

            addToast({
                type: 'success',
                title: 'Perfil atualizado com sucesso!'
            });

            history.push('/dashboard');
        } catch(err) {
            if(err instanceof Yup.ValidationError){
                const errors = getValidationErrors(err);

                formRef.current?.setErrors(errors);
            }
            
            addToast({
                type: 'error',
                title: 'Erro na atualização!',
                description: 'Ocorreu um erro ao tentar atualizar o perfil.'
            });
        }
    }, [addToast, history]);

    const handleAvatarChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {        
        if(event.target.files) {
            const formData = new FormData();

            formData.append('avatar', event.target.files[0]);

            api.patch('/users/avatar', formData).then(
                (response) => {
                    updateUser(response.data);
                    
                    addToast({
                        type: 'success',
                        title: 'Avatar atualizado!'
                    })
                }
            ).catch(
                error => console.log(error)
            );
        }
    }, [addToast, updateUser]);

    return (
        <Container>
            <header>
                <div>
                    <Link to="/dashboard">
                        <FiArrowLeft />
                    </Link>
                </div>
            </header>

            <Content>
                <Form
                    ref={formRef}
                    initialData={{
                        name: user.name,
                        email: user.email
                    }}
                    onSubmit={handleSubmit}
                >
                    <AvatarInput>
                        <img src={user.avatar_url} alt={user.name}/>
                        
                        <label htmlFor="avatar">
                            <FiCamera />

                            <input
                                type="file"
                                id="avatar"
                                onChange={handleAvatarChange}
                            />
                        </label>
                    </AvatarInput>

                    <h1>Meu perfil</h1>

                    <Input icon={FiUser} name="name" placeholder="Nome" />
                    <Input icon={FiMail} name="email" placeholder="E-mail" />
                    
                    <Input
                        containerStyle={{ marginTop: 24 }}
                        icon={FiLock}
                        name="old_password"
                        type="password"
                        placeholder="Senha atual"
                    />
                    <Input
                        icon={FiLock}
                        name="password"
                        type="password"
                        placeholder="Nova senha"
                    />
                    <Input
                        icon={FiLock}
                        name="password_confirmation"
                        type="password"
                        placeholder="Confirmar senha"
                    />

                    <Button type="submit">Confirmar mudanças</Button>
                </Form>
            </Content>
        </Container>
    );
};

export default Profile;