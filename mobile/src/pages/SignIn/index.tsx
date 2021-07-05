import React from 'react';
import { Image } from 'react-native';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Title, ForgotPassword, ForgotPasswordText } from './styles';

import logoImg from '../../assets/logo.png';

const SignIn: React.FC = () => (
    <Container>
        <Image source={logoImg} />

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
);

export default SignIn;
