import React from 'react';
import PropTypes from 'prop-types';

// import { Container } from './styles';

export default function ModalView({
  address,
  address2,
  zip_code,
  start_date,
  end_date,
  signature,
}) {
  return (
    <>
      <strong>Informações da encomenda</strong>
      <p>{address}</p>
      <p>{address2}</p>
      <p>{zip_code}</p>
      {start_date && (
        <>
          <hr />
          <strong>Datas</strong>
          <p>
            <strong>Retirada:</strong> {start_date}
          </p>
          {end_date && (
            <p>
              <strong>Entregue:</strong> {end_date}
            </p>
          )}
        </>
      )}

      {signature && (
        <>
          <hr />
          <strong>Assinatura do destinatário</strong>
          <p>
            <img src={signature} alt="Assinatura" />
          </p>
        </>
      )}
    </>
  );
}
ModalView.propTypes = {
  address: PropTypes.string.isRequired,
  address2: PropTypes.string.isRequired,
  zip_code: PropTypes.string.isRequired,
  start_date: PropTypes.string,
  end_date: PropTypes.string,
  signature: PropTypes.string,
};

ModalView.defaultProps = {
  start_date: '',
  end_date: '',
  signature: '',
};
