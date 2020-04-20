import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  background: #fff;
`;

export const Content = styled.View`
  flex: 1;
  margin: 0 20px;
  margin-bottom: 20px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
`;

export const Background = styled.View`
  background: #7d40e7;
  height: 100px;
  margin-bottom: -80px;
`;

export const Title = styled.Text`
  font-size: 14px;
  text-align: center;
  font-weight: bold;
  margin-bottom: 20px;
  color: #fff;
`;

export const SubButton = styled(Button)`
  background: #7d40e7;
  margin-top: 30px;
`;
