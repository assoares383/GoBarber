import React from 'react';
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi';

import lgoGoBarber from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Background, Container, Content } from './styles';

const SignUp: React.FC = () => (
  <Container>
    <Background />
    <Content>
      <img src={lgoGoBarber} alt="GoBarber" />

      <form>
        <h1>Faça seu cadastro</h1>

        <Input icon={FiUser} name="name" placeholder="Nome" />
        <Input icon={FiMail} name="email" placeholder="E-mail" />
        <Input
          icon={FiLock}
          name="password"
          type="password"
          placeholder="Senha"
        />

        <Button type="submit">Cadastrar</Button>

        <p>Esqueci minha senha</p>
      </form>

      <p>
        <FiArrowLeft /> Voltar para logon
      </p>
    </Content>
  </Container>
);

export default SignUp;
