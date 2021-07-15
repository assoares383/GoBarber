import React, { useCallback, useRef } from 'react';
import { 
    Image, 
    KeyboardAvoidingView, 
    Platform, 
    ScrollView, 
    View,
    Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

import api from '../../services/api';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import Input from '../../components/Input';
import Button from '../../components/Button';

import getValidationErrors from '../../utils/getValidationErrors';

import { 
    Container, 
    Title, 
    BackToSignIn,
    BackToSignInText
} from './styles';

import logoImg from '../../assets/logo.png';

interface SignUpFormData {
    name: string;
    email: string;
    password: string;
}

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const navigation = useNavigation();

    const handleSignUp = useCallback(
        async (data: SignUpFormData) => {
          formRef.current?.setErrors({});
    
          try {
            const schema = Yup.object().shape({
              name: Yup.string().required('Nome obrigatorio'),
              email: Yup.string()
                .required('E-mail obrigatorio')
                .email('Digite um email valido'),
              password: Yup.string().required('Senha obrigatoria'),
            });
    
            await schema.validate(data, {
              abortEarly: false,
            });
    
            await api.post('/users', data);
    
            Alert.alert(
                'Cadastro realizado com sucesso!', 
                'Você já pode fazer login na aplicação.'
            );

            navigation.goBack();
          } catch (err) {
            if (err instanceof Yup.ValidationError) {
              const errors = getValidationErrors(err);
    
              formRef.current?.setErrors(errors);
            }
    
            Alert.alert(
                'Erro no cadastro', 
                'Ocorreu um erro ao fazer o cadastro, tente novamente'
            );
          }
        }, 
    []);

    return (
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

                        <View>
                            <Title>Crie sua conta</Title>
                        </View>
                        <Form ref={formRef} onSubmit={handleSignUp}>
                            <Input
                                name="name"
                                icon="user"
                                placeholder="Name"
                            />

                            <Input
                                name="email"
                                icon="mail"
                                placeholder="E-mail"
                            />
                            <Input
                                name="password"
                                icon="lock"
                                placeholder="Senha"
                            />

                            <Button onPress={() => formRef.current?.submitForm()}>Entrar</Button>
                        </Form>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>

            <BackToSignIn onPress={() => navigation.navigate('SignIn')}>
                <Icon name="arrow-left" size={20} color="#ffffff" />
                <BackToSignInText>Voltar para logon</BackToSignInText>
            </BackToSignIn>
        </>
    )
};

export default SignUp;
