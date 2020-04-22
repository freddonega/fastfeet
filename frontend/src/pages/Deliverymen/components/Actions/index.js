import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MdCreate, MdDeleteForever } from 'react-icons/md';

import Dropdown from '~/components/Dropdown';
// import { Container } from './styles';

export default function Actions({ id, confirmOperation }) {
  return (
    <Dropdown>
      <ul>
        <li>
          <MdCreate color="#4D85EE" size={14} />
          <Link to={`deliverymen/${id}`}>Editar</Link>
        </li>
        <li>
          <MdDeleteForever color="#DE3B3B" size={14} />
          <button
            type="submit"
            onClick={() =>
              confirmOperation({
                title: 'Atenção!',
                description:
                  'Você tem certeza? Essa operação não poderá ser desfeita após confirmada.',
                data: id,
                isVisible: true,
              })
            }
          >
            Excluir
          </button>
        </li>
      </ul>
    </Dropdown>
  );
}
Actions.propTypes = {
  id: PropTypes.number.isRequired,
  confirmOperation: PropTypes.func.isRequired,
};
