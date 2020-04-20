import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  background: #fff;
`;

export const Background = styled.View`
  background: #7d40e7;
  height: 100px;
  margin-bottom: -80px;
`;

export const Form = styled.View`
  background: #fff;
  border-color: #f8f9fd;
  border-top-width: 0;
  border-left-width: 0;
  border-bottom-width: 0;
  border-right-width: 0;
  elevation: 5;
  margin: 20px;
  padding: 10px 20px;
  margin-top: 0px;
  border: 1px solid;

  border-radius: 4px;
`;

export const SubButton = styled(Button)`
  margin: 20px;
  margin-top: 0px;
  background: #7d40e7;
`;
