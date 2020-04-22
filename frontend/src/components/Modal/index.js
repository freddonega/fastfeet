import React from 'react';

import PropTypes from 'prop-types';
import { Container, Content } from './styles';

export default function Modal({ children, isVisible, closeModal }) {
  function close() {
    closeModal();
  }
  return (
    <Container isVisible={isVisible} onClick={close}>
      <Content>{children}</Content>
    </Container>
  );
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  isVisible: PropTypes.bool,
  closeModal: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  isVisible: false,
};
