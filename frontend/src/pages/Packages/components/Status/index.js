import React from 'react';

import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Status({ id, description }) {
  return (
    <Container className={`status_${id}`}>
      <span>{description}</span>
    </Container>
  );
}

Status.propTypes = {
  id: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
};
