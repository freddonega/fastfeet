import styled from 'styled-components';

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
