import React from 'react';
import PropTypes from 'prop-types';

import { MdCheck, MdCancel } from 'react-icons/md';
import { Container, Content } from './styles';

export default function Confirm({
  title,
  description,
  confirmFunction,
  cancelFunction,
  data,
  isVisible,
}) {
  function close() {
    cancelFunction();
  }
  function confirmop() {
    confirmFunction(data);
  }
  return (
    <Container isVisible={isVisible}>
      <Content>
        <strong>{title}</strong>
        <hr />
        <p>{description}</p>
        <hr />
        <div>
          <button type="button" className="btn btn-primary" onClick={confirmop}>
            <MdCheck size={30} />
            Confirmar
          </button>
          <button type="button" className="btn btn-default" onClick={close}>
            <MdCancel size={30} />
            Cancelar
          </button>
        </div>
      </Content>
    </Container>
  );
}

Confirm.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  confirmFunction: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
    .isRequired,
  cancelFunction: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
    .isRequired,
  data: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  isVisible: PropTypes.bool,
};

Confirm.defaultProps = {
  isVisible: false,
};
