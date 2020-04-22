import styled from 'styled-components';
import { Form } from '@unform/web';

export const Container = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;

  @media (max-width: 500px) {
    flex-direction: column-reverse;

    a {
      margin-bottom: 30px;
    }
  }
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  background: #fff;
  padding: 30px;
  border-radius: 4px;

  form {
    margin: 0;
  }
`;

export const Head = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SearchForm = styled(Form)`
  flex-direction: row !important;
  height: 36px;
  margin: 0 !important;
  width: auto !important;
  border-radius: 4px;
  align-items: center !important;
  background: #fff;
  padding: 0px 5px;
  input {
    background: transparent !important;
    border: none !important;

    margin: 0 !important;
  }
`;
