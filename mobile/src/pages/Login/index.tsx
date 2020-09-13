import React, { useRef, useCallback, useState } from 'react';
import { Image, View, ScrollView, KeyboardAvoidingView, Platform, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import Icon from 'react-native-vector-icons/Feather';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.png';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { useAuth } from '../../hooks/auth';

import { Container, Title, ForgotPassword, ForgotPasswordText, CreateAccount, CreateAccountText } from './styles';

interface LoginFormData {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const navigation = useNavigation();
    const formRef = useRef<FormHandles>(null);
    const passwordInputRef = useRef<TextInput>(null);

    const { login } = useAuth();

    const handleLogin = useCallback(async (data: LoginFormData) => {
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                email: Yup.string().required('O e-mail é obrigatório!').email('Informe um e-mail válido!'),
                password: Yup.string().required('A senha é obrigatória!').min(6, 'Informe no mínimo 6 caracteres!')
            });

            await schema.validate(data, { abortEarly: false });

            login(data);
        } catch(err) {
            if(err instanceof Yup.ValidationError){
                const errors = getValidationErrors(err);

                formRef.current?.setErrors(errors);
            }

            Alert.alert(
                'Erro na autenticação!',
                'Ocorreu um erro ao tentar efetuar o login, cheque as credenciais.'
            );
        }
    }, [login]);

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
                        <Image source={logoImg} />
                        <View>
                            <Title>Faça seu Logon</Title>
                        </View>

                        <Form onSubmit={handleLogin} ref={formRef} style={{ width: '100%' }}>
                            <Input
                                name="email"
                                icon="mail"
                                placeholder="E-mail"
                                autoCorrect={false}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    passwordInputRef.current?.focus()
                                }}
                            />

                            <Input
                                ref={passwordInputRef}
                                name="password"
                                icon="lock"
                                placeholder="Senha"
                                secureTextEntry
                                returnKeyType="send"
                                onSubmitEditing={() => {
                                    formRef.current?.submitForm()
                                }}
                            />

                            <Button onPress={() => {
                                formRef.current?.submitForm()
                            }}>Entrar</Button>
                        </Form>

                        <ForgotPassword onPress={() => {}}>
                            <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
                        </ForgotPassword>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>

            <CreateAccount onPress={() => navigation.navigate('Signup')}>
                <Icon name="log-in" size={20} color="#FF9000" />

                <CreateAccountText>Criar conta</CreateAccountText>
            </CreateAccount>
        </>
    );
}

export default Login;