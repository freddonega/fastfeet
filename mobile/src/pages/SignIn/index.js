import React, { useState } from 'react';
import { Image, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Background from '~/components/Background';
import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/fastfeet-logo-white.png';
import Button from '~/components/Button';

import { Container, Form, FormInput } from './styles';

export default function SignIn() {
  const dispatch = useDispatch();
  const [id, setId] = useState(null);
  const loading = useSelector((state) => state.auth.loading);
  function handleSubmit() {
    dispatch(signInRequest(id));
  }
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7d40e7" />
      <Background>
        <Container>
          <Image source={logo} />
          <Form>
            <FormInput
              placeholder="Informe seu ID de cadastro"
              keyboardType="numeric"
              returnKeyType="send"
              onSubmitEditing={handleSubmit}
              value={id}
              onChangeText={setId}
            />
            <Button loading={loading} onPress={handleSubmit}>
              Entrar no sistema
            </Button>
          </Form>
        </Container>
      </Background>
    </>
  );
}
