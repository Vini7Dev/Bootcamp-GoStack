import React, {useCallback, useRef} from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import Icons from 'react-native-vector-icons/Feather';

import api from '../../services/api';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, BackButton, Title, UserAvatarButton, UserAvatar } from './styles';
import { useAuth } from '../../hooks/auth';

interface ProfileFormData {
    name: string;
    email: string;
    old_password: string;
    password: string;
    password_confirmation: string;
}

const Profile: React.FC = () => {
    const { user, updateUser } = useAuth();

    const navigation = useNavigation();
    const formRef = useRef<FormHandles>(null);
    const emailInputRef = useRef<TextInput>(null);
    const oldPasswordInputRef = useRef<TextInput>(null);
    const passwordInputRef = useRef<TextInput>(null);
    const passwordConfirmationInputRef = useRef<TextInput>(null);

    const handleGoBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    const handleSignup = useCallback(async (data: ProfileFormData) => {
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

            const {
                name,
                email,
                old_password,
                password,
                password_confirmation
            } = data;

            const formData = {
                name,
                email,
                ...(old_password
                    ? {
                        old_password,
                        password,
                        password_confirmation
                    }
                    : {})
            };

            const response = await api.put('/profile', formData);

            updateUser(response.data);

            Alert.alert('Perfil atualizado com sucesso!');

            navigation.goBack();
        } catch(err) {
            if(err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);

                formRef.current?.setErrors(errors);
            }

            Alert.alert(
                'Erro na atualização do perfil!',
                'Ocorreu um erro ao tentar atualizar seu perfil, tente novamente.'
            );
        }
    }, []);

    return (
        <>
            <KeyboardAvoidingView
                style={{flex: 1}}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                enabled
            >
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ flex: 1 }}
                >
                    <Container>
                        <BackButton onPress={handleGoBack}>
                            <Icons name="chevron-left" color="#999591" size={24} />
                        </BackButton>

                        <UserAvatarButton onPress={() => {}}>
                            <UserAvatar source={{ uri: user.avatar_url }} />
                        </UserAvatarButton>

                        <View>
                            <Title>Meu perfil</Title>
                        </View>

                        <Form initialData={user} ref={formRef} onSubmit={handleSignup} style={{ width: '100%' }} >
                            <Input
                                name="name"
                                icon="user"
                                placeholder="Nome"
                                autoCapitalize="words"
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    emailInputRef.current?.focus();
                                }}
                            />
                            
                            <Input
                                ref={emailInputRef}
                                name="email"
                                icon="mail"
                                placeholder="E-mail"
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="email-address"
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    oldPasswordInputRef.current?.focus();
                                }}
                            />
                            
                            <Input
                                ref={oldPasswordInputRef}
                                name="old_password"
                                icon="lock"
                                placeholder="Senha atual"
                                textContentType="newPassword"
                                secureTextEntry
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    passwordInputRef.current?.focus();
                                }}
                                containerStyle={{ marginTop: 16 }}
                            />

                            <Input
                                ref={passwordInputRef}
                                name="password"
                                icon="lock"
                                placeholder="Nova senha"
                                textContentType="newPassword"
                                secureTextEntry
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    passwordConfirmationInputRef.current?.focus();
                                }}
                            />

                            <Input
                                ref={passwordConfirmationInputRef}
                                name="password_confirmation"
                                icon="lock"
                                placeholder="Confirmar senha"
                                textContentType="newPassword"
                                secureTextEntry
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    formRef.current?.submitForm();
                                }}
                            />
                            
                            <Button
                                onPress={() => {
                                    formRef.current?.submitForm();
                                }}
                            >
                                Confirmar mudanças
                            </Button>
                        </Form>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>
        </>
    )
}

export default Profile;