import styled from 'styled-components/native';
import Button from '~/components/Button';
import Avatar from '~/components/Avatar';

export const Container = styled.View`
  margin: 45px;
  margin-top: 70px;
`;
export const Photo = styled(Avatar)`
  align-self: center;
  margin-bottom: 20px;
`;
export const Label = styled.Text`
  margin-top: 20px;
  font-size: 12px;
  color: #666666;
`;
export const Value = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #444444;
`;
export const SubButton = styled(Button)`
  margin-top: 40px;
  background: #e74040;
`;
