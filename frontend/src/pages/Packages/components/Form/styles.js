import styled from 'styled-components';

export const LineGroup = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  & + div {
    margin-top: 20px;
  }
`;
