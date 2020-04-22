import React, { useRef, useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import { Form } from '@unform/web';
import PropTypes from 'prop-types';

import * as Yup from 'yup';
import api from '~/services/api';
import { LineGroup } from './styles';
import Input from '~/components/Input';
import AvatarInput from '../AvatarInput';

// import { Container } from './styles';

export default function Forms({ handleSubmit, id_item, ...rest }) {
  const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    email: Yup.string()
      .email('Preencha esse campo com um email válido')
      .required('O email é obrigatório'),
  });
  const formRef = useRef(null);
  const [nameAvatar, setNameAvatar] = useState(false);
  const [preview, setPreview] = useState(false);
  useEffect(() => {
    async function loadInitialData() {
      if (id_item) {
        const response = await api.get(`/deliverymen/${id_item}`);
        const { name, email, avatar_id, avatar } = response.data;
        setNameAvatar(name);
        formRef.current.setData({ name, email, avatar_id });
        setPreview(avatar && avatar.url);
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
        <AvatarInput reactAvatar={nameAvatar} previewUrl={preview} />
      </LineGroup>
      <LineGroup>
        <Input label="Nome" name="name" type="text" placeholder="John doe" />
      </LineGroup>
      <LineGroup>
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="example@rocketseat.com"
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
