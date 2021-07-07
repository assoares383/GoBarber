import React from 'react';
import { 
    Image, 
    KeyboardAvoidingView, 
    Platform, 
    ScrollView, 
    View 
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { 
    Container, 
    Title, 
    BackToSignIn,
    BackToSignInText
} from './styles';

import logoImg from '../../assets/logo.png';

const SignUp: React.FC = () => {
    const navigation = useNavigation();

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

                        <Button onPress={() => {
                            console.log('clicou')
                        }}>Entrar</Button>
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
