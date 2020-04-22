import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  width: 0%;
  height: 100%;
  background: rgba(255, 255, 255, 0.6);
  z-index: 9999;
  transition: width 0.6s;
  right: 0;
  display: flex;
  align-content: center;
  justify-content: center;
  overflow: hidden;

  &.loading {
    right: auto;
    left: 0;
    width: 100%;
  }

  img {
    animation: shake 0.82s linear infinite;
  }
`;
