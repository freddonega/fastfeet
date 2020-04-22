import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  & + div {
    margin-left: 30px;
  }

  flex: ${(props) => (props.flex ? props.flex : 1)};
`;
