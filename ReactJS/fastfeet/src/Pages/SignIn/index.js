import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Form } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '../../assets/fastfeet-logo.png';
import { Container } from './styles';

import { SignInRequest } from '../../store/modules/auth/actions';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().min(6).required('A senha é obrigatória'),
});

function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(SignInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="fastfeet" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Container>
          <p>SEU E-MAIL</p>
          <Input name="email" type="email" placeholder="exemplo@email.com" />
          <p>SUA SENHA</p>
          <Input name="password" type="password" placeholder="*************" />
        </Container>

        <button type="submit">
          {loading ? 'Carregando...' : 'Entrar no sistema'}
        </button>
      </Form>
    </>
  );
}

export default SignIn;
