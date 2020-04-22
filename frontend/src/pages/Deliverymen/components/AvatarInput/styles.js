import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;
  margin-bottom: 30px;
  border: 1px dashed #dddddd;
  border-radius: 50%;
  height: 150px;
  width: 150px;
  background: #fff;
  margin: 0 auto;
  overflow: hidden;

  label {
    width: 100%;
    height: 100%;
    cursor: pointer;
    background: transparent;
    &:hover {
      opacity: 0.7;
    }

    input {
      display: none;
    }
  }
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;

  color: #ddd;
`;
