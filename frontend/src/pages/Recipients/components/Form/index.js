import React, { useRef, useEffect } from 'react';

import { toast } from 'react-toastify';
import { Form } from '@unform/web';
import PropTypes from 'prop-types';

import * as Yup from 'yup';
import api from '~/services/api';
import { LineGroup } from './styles';
import Input from '~/components/Input';

// import { Container } from './styles';

export default function Forms({ handleSubmit, id_item, ...rest }) {
  const schema = Yup.object().shape({
    name: Yup.string().required('Esse campo é obrigatório'),
    street: Yup.string().required('Esse campo é obrigatório'),
    number: Yup.string().required('Esse campo é obrigatório'),
    complement: Yup.string(),
    city: Yup.string().required('Esse campo é obrigatório'),
    state: Yup.string().required('Esse campo é obrigatório'),
    zip_code: Yup.string().required('Esse campo é obrigatório'),
  });
  const formRef = useRef(null);
  useEffect(() => {
    async function loadInitialData() {
      if (id_item) {
        const response = await api.get(`/recipients/${id_item}`);
        const recipient = response.data;
        formRef.current.setData(recipient);
      }
    }
    loadInitialData();
  }, [id_item]);

  async function Validation(data, { reset }) {
    formRef.current.setErrors({});
    try {
      await schema.validate(data, {
        abortEarly: false,
      });

      const response = handleSubmit(data);
      if (!response) {
        toast.error('Falha na operação, verifique os dados e tente novamente!');
        return;
      }
      toast.success('Operação realizada com sucesso!');
      if (!id_item) {
        reset();
      }
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        toast.error('Falha na operação, verifique os dados e tente novamente!');
        const errorMessages = {};
        err.inner.forEach((error) => {
          errorMessages[error.path] = error.message;
        });
        formRef.current.setErrors(errorMessages);
      }
    }
  }

  return (
    <Form ref={formRef} onSubmit={Validation} {...rest}>
      <LineGroup>
        <Input
          label="Nome"
          name="name"
          type="text"
          placeholder="Ludwig van Beethoven"
        />
      </LineGroup>
      <LineGroup>
        <Input
          label="Rua"
          name="street"
          type="text"
          placeholder="Rua Beethoven"
          flex={3}
        />
        <Input label="Número" name="number" type="text" placeholder="1729" />
        <Input
          label="Complemento"
          name="complement"
          type="text"
          placeholder=""
        />
      </LineGroup>
      <LineGroup>
        <Input label="Cidade" name="city" type="text" placeholder="Diadema" />
        <Input
          label="Estado"
          name="state"
          type="text"
          placeholder="São Paulo"
        />
        <Input
          label="Cep"
          name="zip_code"
          type="text"
          placeholder="09960-580"
          mask="99999-999"
        />
      </LineGroup>
    </Form>
  );
}

Forms.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  id_item: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
};

Forms.defaultProps = {
  id_item: false,
};
