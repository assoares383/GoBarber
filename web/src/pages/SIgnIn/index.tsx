import React from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import lgoGoBarber from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Background, Container, Content } from './styles';

const SignIn: React.FC = () => (
  <Container>
    <Content>
      <img src={lgoGoBarber} alt="GoBarber" />

      <form>
        <h1>Faça seu logon</h1>

        <Input icon={FiMail} name="email" placeholder="E-mail" />
        <Input
          icon={FiLock}
          name="password"
          type="password"
          placeholder="Senha"
        />

        <Button type="submit">Entrar</Button>

        <Link to="forgot-password">Esqueci minha senha</Link>
      </form>

      <Link to="/signup">
        <FiLogIn /> Criar Conta
      </Link>
    </Content>
    <Background />
  </Container>
);

export default SignIn;
