import React, {useCallback, useRef} from 'react';
import { View, Image, ScrollView, KeyboardAvoidingView, Platform, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Title, BackToLogin, BackToLoginText } from './styles';

interface SignupFormData {
    name: string;
    email: string;
    password: string;
}

const Signup: React.FC = () => {
    const navigation = useNavigation();
    const formRef = useRef<FormHandles>(null);
    const emailInputRef = useRef<TextInput>(null);
    const passwordInputRef = useRef<TextInput>(null);

    const handleSignup = useCallback(async (data: SignupFormData) => {
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                name: Yup.string().required('O nome é obrigatório!'),
                email: Yup.string().required('O e-mail é obrigatório!').email('Informe um e-mail válido!'),
                password: Yup.string().required('A senha é obrigatória!').min(6, 'Informe no mínimo 6 caracteres!')
            });

            await schema.validate(data, { abortEarly: false });

            await api.post('users', data);

            Alert.alert(
                'Cadastro realizado com sucesso!',
                'Você já pode fazer login na aplicação.'
            );

            navigation.goBack();
        } catch(err) {
            if(err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);

                formRef.current?.setErrors(errors);
            }

            Alert.alert(
                'Erro na autenticação!',
                'Ocorreu um erro ao tentar efetuar o login, cheque as credenciais.'
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
                        <Image source={logoImg} />
                        <View>
                            <Title>Crie sua conta</Title>
                        </View>

                        <Form ref={formRef} onSubmit={handleSignup} style={{ width: '100%' }} >
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
                                    passwordInputRef.current?.focus();
                                }}
                            />
                            
                            <Input
                                ref={passwordInputRef}
                                name="password"
                                icon="lock"
                                placeholder="Senha"
                                textContentType="newPassword"
                                secureTextEntry
                                returnKeyType="send"
                                onSubmitEditing={() => {
                                    formRef.current?.submitForm();
                                }}
                            />
                            
                            <Button
                                onPress={() => {
                                    formRef.current?.submitForm();
                                }}
                            >
                                Cadastrar
                            </Button>
                        </Form>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>

            <BackToLogin onPress={() => navigation.goBack()}>
                <Icon name="arrow-left" size={20} color="#FFF" />

                <BackToLoginText>Voltar para Login</BackToLoginText>
            </BackToLogin>
        </>
    )
}

export default Signup;