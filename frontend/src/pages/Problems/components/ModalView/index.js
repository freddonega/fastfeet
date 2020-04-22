import React from 'react';
import PropTypes from 'prop-types';

// import { Container } from './styles';

export default function ModalView({ problem }) {
  return (
    <>
      <strong>Visualizar Problema</strong>
      <p>{problem}</p>
    </>
  );
}
ModalView.propTypes = {
  problem: PropTypes.string.isRequired,
};
