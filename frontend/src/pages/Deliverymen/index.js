import React, { useState, useEffect } from 'react';

import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import ReactPaginate from 'react-paginate';
import { MdSearch, MdAdd, MdMoreHoriz } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Input from '~/components/Input';

import api from '~/services/api';

import ProfileAvatar from '~/components/ProfileAvatar';
import Confirm from '~/components/Confirm';
import Actions from './components/Actions';

import { Container, Head } from './styles';
import { SearchForm } from '~/pages/_layouts/default/styles';

export default function Deliverymen() {
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

  const [confirmDetails, setConfirmDetails] = useState(deafaultConfirm);

  useEffect(() => {
    async function loadItems() {
      const { data } = await api.get('/deliverymen', {
        params: filter,
      });
      const { count, deliverymen } = data;
      setTotalPages(count);
      setItems(deliverymen);
    }

    loadItems();
  }, [filter]);

  function handlePageClick({ selected }) {
    setFilter({ ...filter, page: selected + 1 });
  }

  function handleQuery({ search }) {
    setFilter({ ...filter, page: 1, q: search });
  }

  function confirmOperation(data) {
    setConfirmDetails(data);
  }

  async function confirmDelete(id) {
    try {
      await api.delete(`deliverymen/${id}`);
      toast.success('Operação realizada com sucesso');
    } catch (err) {
      toast.error('Falha na operação');
    }
    setFilter({ ...filter });
    setConfirmDetails(deafaultConfirm);
  }
  function cancelDelete() {
    setConfirmDetails(deafaultConfirm);
  }

  return (
    <>
      <Head>
        <h1>Gerenciando entregadores</h1>
      </Head>
      <Container>
        <SearchForm onSubmit={handleQuery}>
          <button type="submit">
            <MdSearch size={30} color="#999" />
          </button>
          <Input
            type="text"
            id="search"
            name="search"
            placeholder="Buscar por encomendas"
          />
        </SearchForm>
        <div className="actions">
          <Link
            to="/deliverymen/create"
            className={`btn btn-primary ${items.length === 0 && 'animated'}`}
          >
            <MdAdd size={30} color="#fff" />
            CADASTRAR
          </Link>
        </div>
      </Container>

      <Table className="loading">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Foto</Th>
            <Th>Nome</Th>
            <Th>Email</Th>
            <Th align="center">Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.map((item) => (
            <Tr key={String(item.id)}>
              <Td>{item.id}</Td>
              <Td>
                <ProfileAvatar
                  name={item.name}
                  url={item.avatar ? item.avatar.url : ''}
                />
              </Td>
              <Td>{item.name}</Td>
              <Td>{item.email}</Td>
              <Td width="50" align="center">
                <Actions
                  id={item.id}
                  item={item}
                  confirmOperation={confirmOperation}
                />
              </Td>
            </Tr>
          ))}
          {items.length === 0 && (
            <Tr>
              <Td colSpan="5" align="center">
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
      <Confirm
        confirmFunction={confirmDelete}
        cancelFunction={cancelDelete}
        {...confirmDetails}
      />
    </>
  );
}
