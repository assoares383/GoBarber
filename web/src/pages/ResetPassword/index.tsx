import React, { useCallback, useRef } from 'react';
import { FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import lgoGoBarber from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { AnimationContainer, Background, Container, Content } from './styles';

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const history = useHistory();

  const handleSubmit = useCallback( async (data: ResetPasswordFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        password: Yup.string().required('Senha Obrigatória'),
        password_confirmation: Yup.string().oneOf(
          [Yup.ref('password'), null],
          'Confirmação incorreta',
        ),
      });

      await schema.validate(data, {
        abortEarly: false
      });

      history.push('/dashboard');

    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);

        return;
      }

      addToast({
        type: 'error',
        title: 'Erro ao resetar a senha',
        description: 'Ocorreu um erro ao resetar sua senha, tente novamente.',
      });
    }
  }, [addToast, history]);

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={lgoGoBarber} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Resetar senha</h1>

            <Input
              icon={FiLock}
              name="password"
              type="password"
              placeholder="Nova Senha"
            />

            <Input
              icon={FiLock}
              name="password_confirmation"
              type="password"
              placeholder="Confirmação da Senha"
            />

            <Button type="submit">Alterar senha</Button>
          </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
}

export default ResetPassword;
