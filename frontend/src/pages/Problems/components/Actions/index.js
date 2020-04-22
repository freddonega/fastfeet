import React from 'react';
import PropTypes from 'prop-types';
import { MdVisibility, MdDeleteForever } from 'react-icons/md';

import Dropdown from '~/components/Dropdown';
// import { Container } from './styles';

export default function Actions({ id, item, openModal, confirmOperation }) {
  function handleView(item_scope) {
    openModal(item_scope);
  }

  return (
    <Dropdown width={200}>
      <ul>
        <li>
          <MdVisibility color="#8E5BE8" size={14} />
          <button type="button" onClick={() => handleView(item)}>
            Visualizar
          </button>
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
            Cancelar Encomenda
          </button>
        </li>
      </ul>
    </Dropdown>
  );
}
Actions.propTypes = {
  id: PropTypes.number.isRequired,
  item: PropTypes.oneOfType([PropTypes.object]).isRequired,
  openModal: PropTypes.func.isRequired,
  confirmOperation: PropTypes.func.isRequired,
};
