import React from 'react';

import { Link } from 'react-router-dom';
import { MdCheck, MdChevronLeft } from 'react-icons/md';
import PropTypes from 'prop-types';
import Forms from './components/Form';

import api from '~/services/api';

import { Container, Content, Head } from './styles';

export default function DeliverymenUpdate({ match }) {
  const { id } = match.params;
  async function handleSubmit({ name, email, avatar_id }) {
    try {
      const response = await api.put(`/deliverymen/${id}`, {
        name,
        email,
        avatar_id,
      });
      return response;
    } catch (err) {
      return false;
    }
  }

  return (
    <>
      <Head>
        <h1>Edição de entregadores</h1>
        <div className="actions">
          <Link to="/deliverymen" className="btn btn-default">
            <MdChevronLeft size={30} color="#fff" />
            Voltar
          </Link>
          <button type="submit" form="form" className="btn btn-primary">
            <MdCheck size={30} color="#fff" />
            Salvar
          </button>
        </div>
      </Head>
      <Container>
        <Content>
          <Forms id="form" handleSubmit={handleSubmit} id_item={Number(id)} />
        </Content>
      </Container>
    </>
  );
}

DeliverymenUpdate.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
