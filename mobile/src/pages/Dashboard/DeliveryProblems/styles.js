import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #fff;
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

export const Problem = styled.Text``;

export const Date = styled.Text``;
