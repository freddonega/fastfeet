import React, { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import ReactPaginate from 'react-paginate';

import { MdMoreHoriz } from 'react-icons/md';

import api from '~/services/api';

import Confirm from '~/components/Confirm';
import Modal from '~/components/Modal';

import Actions from './components/Actions';
import ModalView from './components/ModalView';

import { Head } from './styles';

export default function Problems() {
  const defaultModal = {
    problem: '',
  };
  const deafaultConfirm = {
    title: '',
    description: '',
    confirmFunction: '',
    cancelFunction: '',
    data: '',
  };
  const [filter, setFilter] = useState({ page: 1, limit: 6 });

  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState([]);

  const [visible, setVisible] = useState(false);
  const [modalDetails, setModalDetails] = useState(defaultModal);

  const [confirmDetails, setConfirmDetails] = useState(deafaultConfirm);

  useEffect(() => {
    async function loadItems() {
      const { data } = await api.get('/problems', {
        params: filter,
      });
      const { count, problems } = data;
      setTotalPages(count);
      setItems(problems);
    }

    loadItems();
  }, [filter]);

  function handlePageClick({ selected }) {
    setFilter({ ...filter, page: selected + 1 });
  }

  function openModal(item) {
    setVisible(true);

    setModalDetails({
      problem: item.description,
    });
  }
  function closeModal() {
    setVisible(false);
    setModalDetails(defaultModal);
  }
  function confirmOperation(data) {
    setConfirmDetails(data);
  }

  async function confirmDelete(id) {
    await api.delete(`/problems/${id}/cancel-delivery`);
    setFilter({ ...filter });
    setConfirmDetails(deafaultConfirm);
  }
  function cancelDelete() {
    setConfirmDetails(deafaultConfirm);
  }

  return (
    <>
      <Head>
        <h1>Problemas na entrega</h1>
      </Head>

      <Table className="loading">
        <Thead>
          <Tr>
            <Th>Encomenda</Th>
            <Th>Problema</Th>
            <Th align="center">Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.map((item) => (
            <Tr key={String(item.id)}>
              <Td>{item.package.id}</Td>
              <Td>
                {item.description.length > 100
                  ? `${item.description.substring(0, 100)}...`
                  : item.description}
              </Td>
              <Td width="50" align="center">
                <Actions
                  id={item.id}
                  item={item}
                  openModal={openModal}
                  confirmOperation={confirmOperation}
                />
              </Td>
            </Tr>
          ))}
          {items.length === 0 && (
            <Tr>
              <Td colSpan="3" align="center">
                <MdMoreHoriz size={50} color="#999" />
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
      <ReactPaginate
        previousLabel="<"
        nextLabel=">"
        breakLabel="..."
        breakClassName="break-me"
        pageCount={Number(totalPages)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName="pagination"
        subContainerClassName="pages pagination"
        activeClassName="active"
      />
      <Modal isVisible={visible} closeModal={closeModal} className="preview">
        <ModalView {...modalDetails} />
      </Modal>
      <Confirm
        confirmFunction={confirmDelete}
        cancelFunction={cancelDelete}
        {...confirmDetails}
      />
    </>
  );
}
