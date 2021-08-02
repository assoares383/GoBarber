import React, { useCallback, useRef } from 'react';
import { 
    KeyboardAvoidingView, 
    Platform, 
    ScrollView, 
    View,
    Alert,
    TextInput
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-picker';

import api from '../../services/api';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { useAuth } from '../../hooks/auth';

import { BackButton, Container, Title, UserAvatar, UserAvatarButton } from './styles';
interface ProfileFormData {
    name: string;
    email: string;
    password: string;
}

const Profile: React.FC = () => {
    const { user } = useAuth();
    const formRef = useRef<FormHandles>(null);
    const navigation = useNavigation();

    const emailInputRef = useRef<TextInput>(null);
    const passwordInputRef = useRef<TextInput>(null);
    const newPasswordInputRef = useRef<TextInput>(null);
    const confirmPasswordInputRef = useRef<TextInput>(null);

    const handleSaveProfile = useCallback(
        async (data: ProfileFormData) => {
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
    [navigation]);

    const handleGoBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

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
                        <BackButton onPress={handleGoBack}>
                            <Icon name="chevron-left" size={24} color="#999591" />
                        </BackButton>
                        <UserAvatarButton onPress={() => {}}>
                            <UserAvatar source={{ uri: user.avatar_url }} />
                        </UserAvatarButton>
                        <View>
                            <Title>Meu Perfil</Title>
                        </View>
                        <Form initialData={user} ref={formRef} onSubmit={handleSaveProfile}>
                            <Input
                                name="name"
                                icon="user"
                                placeholder="Name"
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    emailInputRef.current?.focus();
                                }}
                            />

                            <Input
                                ref={emailInputRef}
                                keyboardType="email-address"
                                autoCorrect={false}
                                autoCapitalize="none"
                                name="email"
                                icon="mail"
                                placeholder="E-mail"
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    passwordInputRef.current?.focus();
                                }}
                            />

                            <Input
                                containerStyle={{ marginTop: 16 }}
                                ref={passwordInputRef}
                                secureTextEntry
                                name="old_password"
                                icon="lock"
                                placeholder="Senha atual"
                                textContentType="newPassword"
                                returnKeyType="next"
                                onSubmitEditing={() => newPasswordInputRef.current?.focus()}
                            />

                            <Input
                                ref={newPasswordInputRef}
                                secureTextEntry
                                name="password"
                                icon="lock"
                                placeholder="Nova senha"
                                textContentType="newPassword"
                                returnKeyType="next"
                                onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
                            />

                            <Input
                                ref={confirmPasswordInputRef}
                                secureTextEntry
                                name="password_confirmation"
                                icon="lock"
                                placeholder="Confirmar senha"
                                textContentType="newPassword"
                                returnKeyType="send"
                                onSubmitEditing={() => formRef.current?.submitForm()}
                            />

                            <Button onPress={() => formRef.current?.submitForm()}>
                                Confirmar mudanças
                            </Button>
                        </Form>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>
        </>
    )
};

export default Profile;
