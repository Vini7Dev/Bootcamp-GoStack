import React, { useCallback, useRef } from 'react';
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

interface ProfileData {
    name: string;
    emal: string;
    password: string;
}

const Profile: React.FC = () => {
    const { user } = useAuth();

    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();

    const handleSubmit = useCallback(async (data: ProfileData) => {
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
                        
                        <button>
                            <FiCamera />
                        </button>
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