import React, { useState } from 'react';
import truck from '~/assets/truck.svg';

import { Container } from './styles';
import api from '~/services/api';

export default function Loading() {
  const [loading, setLoading] = useState(false);
  api.interceptors.request.use(
    (conf) => {
      // eventHub.$emit('before-request');
      setLoading(true);
      return conf;
    },
    (error) => {
      setTimeout(() => {
        setLoading(false);
      }, 500);

      return Promise.reject(error);
    }
  );
  api.interceptors.response.use(
    (response) => {
      setTimeout(() => {
        setLoading(false);
      }, 500);
      return response;
    },
    (error) => {
      setTimeout(() => {
        setLoading(false);
      }, 500);
      return Promise.reject(error);
    }
  );
  return (
    <Container className={loading && 'loading'}>
      <img src={truck} alt="FastFeet" />
    </Container>
  );
}
