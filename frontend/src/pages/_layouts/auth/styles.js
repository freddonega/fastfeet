import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #7d40e7;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 360px;
  background: #fff;
  border-radius: 4px;
  padding: 60px 30px;
  border: 1px solid #dddddd;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    font-size: 14px;

    label {
      font-weight: bold;
      margin-bottom: 5px;
      margin-top: 10px;
      color: #444444;
    }

    input {
      background: #fff;
      border: 1px solid #dddddd;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #444;
      margin: 0 0 10px;
      width: 100%;
      font-size: 16px;

      &::placeholder {
        color: #999999;
      }
    }

    button {
      margin: 5px 0 0;
      background: #7d40e7;
      border: 0;
      color: #fff;
      font-weight: bold;
      padding: 10px;
      border-radius: 4px;
      transition: background 0.2s;
      font-size: 16px;

      &:hover {
        background: ${darken(0.05, '#7D40E7')};
      }
    }
  }
`;
