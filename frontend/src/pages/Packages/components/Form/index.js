import React, { useRef, useEffect } from 'react';

import { toast } from 'react-toastify';
import { Form } from '@unform/web';
import PropTypes from 'prop-types';

import * as Yup from 'yup';
import api from '~/services/api';
import { LineGroup } from './styles';
import Input from '~/components/Input';
import Select from '~/components/Select';

// import { Container } from './styles';

export default function Forms({ handleSubmit, id_item, ...rest }) {
  const schema = Yup.object().shape({
    recipient_id: Yup.string().required('Escolha um destinatário'),
    deliveryman_id: Yup.string().required('Escolha um entregador'),
    product: Yup.string().required('O nome do produto é obrigatório'),
  });
  const formRef = useRef(null);
  useEffect(() => {
    async function loadInitialData() {
      if (id_item) {
        const response = await api.get(`/packages/${id_item}`);
        formRef.current.setData(response.data);
        if (response.data.recipient) {
          formRef.current.setFieldValue('recipient_id', {
            value: response.data.recipient.id,
            label: response.data.recipient.name,
          });
        }
        if (response.data.deliveryman) {
          formRef.current.setFieldValue('deliveryman_id', {
            value: response.data.deliveryman.id,
            label: response.data.deliveryman.name,
          });
        }
      }
    }
    loadInitialData();
  }, [id_item]);
  async function loadRecipients(inputValue, callback) {
    const { data } = await api.get('/recipients', {
      params: {
        q: inputValue,
      },
    });

    const recipients = data.recipients.map((recipient) => ({
      value: recipient.id,
      label: recipient.name,
    }));

    callback(recipients);
  }

  async function loadDeliverymen(inputValue, callback) {
    const { data } = await api.get('/deliverymen', {
      params: {
        q: inputValue,
      },
    });

    const deliverymen = data.deliverymen.map((deliveryman) => ({
      value: deliveryman.id,
      label: deliveryman.name,
    }));

    callback(deliverymen);
  }

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
        <Select
          type="text"
          label="Destinatário"
          name="recipient_id"
          placeholder="Destinatários"
          noOptionsMessage={() => 'Nenhum destinatário encontrado'}
          loadOptions={loadRecipients}
        />
        <Select
          type="text"
          label="Entregador"
          name="deliveryman_id"
          placeholder="Entregadores"
          noOptionsMessage={() => 'Nenhum entregador encontrado'}
          loadOptions={loadDeliverymen}
        />
      </LineGroup>
      <LineGroup>
        <Input
          label="Nome do produto"
          name="product"
          type="text"
          placeholder="Nome do produto"
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
