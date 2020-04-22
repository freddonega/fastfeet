import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 9999;
  display: ${(props) => (props.isVisible ? 'block' : 'none')};
`;

export const Content = styled.div`
  position: absolute;
  background: #fff;
  width: 450px;
  max-width: calc(100% - 40px);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  padding: 20px;
  border-radius: 4px;
`;
