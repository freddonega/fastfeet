import styled from 'styled-components/native';

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
`;
export const Container = styled.View`
  flex: 1;
  background: #fff;
`;

export const Content = styled.View`
  padding: 20px;
  padding-bottom: 0;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
`;

export const Nav = styled.View`
  flex-direction: row;
`;

export const Anchor = styled.Text`
  font-size: 12px;
  color: ${(props) => (props.active ? '#7D40E7' : '#999999')};
  font-weight: bold;
  margin-left: 15px;
  padding-bottom: 4px;
  text-decoration: ${(props) => (props.active ? 'underline' : 'none')};
`;
