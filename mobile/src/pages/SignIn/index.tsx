import React from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { Icon } from '../../components/Input/styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { 
    Container, 
    Title, 
    ForgotPassword, 
    ForgotPasswordText, 
    CreateAccountButton,
    CreateAccountButtonText
} from './styles';

import logoImg from '../../assets/logo.png';

const SignIn: React.FC = () => (
    <>
        <KeyboardAvoidingView 
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            enabled
        >
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ flex: 1 }}
            >
                <Container>
                    <Image source={logoImg} />

                    <View></View>
                    <Title>Faça seu logon</Title>

                    <Input
                        autoCorrect={false}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        name="email"
                        icon="mail"
                        placeholder="E-mail"
                        returnKeyType="next"
                    />
                    <Input
                        name="password"
                        icon="lock"
                        placeholder="Senha"
                        secureTextEntry
                        returnKeyType="send"
                    />

                    <Button onPress={() => {
                        console.log('clicou')
                    }}>Entrar</Button>

                    <ForgotPassword>
                        <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
                    </ForgotPassword>
                </Container>
            </ScrollView>
        </KeyboardAvoidingView>

        <CreateAccountButton onPress={() => {}}>
            <Icon name="log-in" size={20} color="#ff9000" />
            <CreateAccountButtonText>Criar um conta</CreateAccountButtonText>
        </CreateAccountButton>
    </>
);

export default SignIn;
