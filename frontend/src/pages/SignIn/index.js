import React from 'react';
import { useDispatch } from 'react-redux';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import Input from '~/components/Input';
import logo from '~/assets/fastfeet-logo.png';

import { signInRequest } from '~/store/modules/auth/actions';

export default function SignIn() {
  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Insira um email válido')
      .required('O e-mail é obrigatório'),
    password: Yup.string().required('A senha é obrigatória'),
  });
  const dispatch = useDispatch();
  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="FastFeet" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <div>
          <Input
            name="email"
            type="email"
            placeholder="exemplo@email.com"
            label="Seu e-mail"
          />
        </div>
        <div>
          <Input
            name="password"
            type="password"
            placeholder="*******"
            label="Sua senha"
          />
        </div>
        <button type="submit">Entrar no sistema</button>
      </Form>
    </>
  );
}
