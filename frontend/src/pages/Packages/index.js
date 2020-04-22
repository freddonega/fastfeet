import React, { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import ReactPaginate from 'react-paginate';
import { MdSearch, MdAdd, MdMoreHoriz } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { toast } from 'react-toastify';
import Input from '~/components/Input';
import Checkbox from '~/components/Checkbox';

import api from '~/services/api';

import ProfileAvatar from '~/components/ProfileAvatar';
import Confirm from '~/components/Confirm';
import Modal from '~/components/Modal';
import Status from './components/Status';
import Actions from './components/Actions';
import ModalView from './components/ModalView';

import { Container, Head, WithProblems } from './styles';
import { SearchForm } from '~/pages/_layouts/default/styles';

export default function Packages() {
  const defaultModal = {
    address: '',
    address2: '',
    zip_code: '',
  };
  const deafaultConfirm = {
    title: '',
    description: '',
    confirmFunction: '',
    cancelFunction: '',
    data: '',
  };
  const [withProblems, setWithProblems] = useState(0);
  const [filter, setFilter] = useState({
    page: 1,
    limit: 6,
    withProblems: 0,
  });

  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState([]);

  const [visible, setVisible] = useState(false);
  const [modalDetails, setModalDetails] = useState(defaultModal);

  const [confirmDetails, setConfirmDetails] = useState(deafaultConfirm);

  useEffect(() => {
    async function loadItems() {
      const { data } = await api.get('/packages', {
        params: filter,
      });
      const { count, packages } = data;
      setTotalPages(count);
      setItems(packages);
    }

    loadItems();
  }, [filter]);

  function handlePageClick({ selected }) {
    setFilter({ ...filter, page: selected + 1 });
  }

  function handleQuery({ search }) {
    setFilter({ ...filter, page: 1, q: search });
  }

  function handleWithProblems() {
    const p = withProblems === 0 ? 1 : 0;
    setWithProblems(p);
    setFilter({ ...filter, page: 1, withProblems: p });
  }

  function openModal(item) {
    setVisible(true);

    setModalDetails({
      address: `${item.recipient.street}, ${item.recipient.number}`,
      address2: `${item.recipient.city} - ${item.recipient.state}`,
      zip_code: item.recipient.zip_code,
      start_date:
        item.start_date &&
        format(parseISO(item.start_date), 'dd/MM/Y', {
          locale: pt,
        }),
      end_date:
        item.end_date &&
        format(parseISO(item.end_date), 'dd/MM/Y', {
          locale: pt,
        }),
      signature: item.signature && item.signature.url,
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
    try {
      await api.delete(`packages/${id}`);
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
        <h1>Gerenciando encomendas</h1>
      </Head>
      <Container>
        <div className="actions">
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
          <WithProblems htmlFor="withProblems">
            <Checkbox
              id="withProblems"
              name="withProblems"
              checked={withProblems === 1}
              onChange={handleWithProblems}
            />
            <span>Listar somente as com problemas</span>
          </WithProblems>
        </div>
        <div className="actions">
          <Link
            to="/packages/create"
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
            <Th>Produto</Th>
            <Th>Destinatário</Th>
            <Th>Entregador</Th>
            <Th>Cidade</Th>
            <Th>Estado</Th>
            <Th>Status</Th>
            <Th align="center">Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.map((item) => (
            <Tr key={String(item.id)}>
              <Td>{item.id}</Td>
              <Td>{item.product}</Td>
              <Td>{(item.recipient && item.recipient.name) || '-'}</Td>
              <Td>
                {(item.deliveryman && (
                  <>
                    <ProfileAvatar
                      name={item.deliveryman.name}
                      url={
                        item.deliveryman.avatar
                          ? item.deliveryman.avatar.url
                          : ''
                      }
                    />
                    {item.deliveryman.name}
                  </>
                )) ||
                  '-'}
              </Td>
              <Td>{item.recipient.city}</Td>
              <Td>{item.recipient.state}</Td>
              <Td width="130">
                <Status
                  id={item.status.id}
                  description={item.status.description}
                />
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
              <Td colSpan="8" align="center">
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
