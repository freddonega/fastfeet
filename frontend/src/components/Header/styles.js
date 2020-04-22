import styled from 'styled-components';

export const Container = styled.header`
  height: 60px;
  background: #fff;
  padding: 0 30px;
`;
export const Content = styled.div`
  height: 60px;
  max-width: 1440px;
  padding: 0 30px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;
    img {
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #eee;
      width: 135px;
    }
  }
  aside {
    text-align: right;
    font-size: 14px;
    p {
      font-weight: bold;
    }
    button {
      color: #de3b3b;
      background: transparent;
      border: 0;
      cursor: pointer;
    }
  }
`;
