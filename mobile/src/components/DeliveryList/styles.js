import styled from 'styled-components/native';

export const Container = styled.View`
  border-width: 1px;
  border-radius: 4px;
  border-color: #f8f9fd;
  border-bottom-width: 0;
  elevation: 5;
  background: #fff;
  margin: 20px;
  margin-top: 0px;
`;

export const Header = styled.View`
  flex-direction: row;

  padding: 14px;
`;

export const Timeline = styled.View`
  padding: 14px;
`;

export const Footer = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  background: #f8f9fd;
  padding: 14px;
`;

export const Title = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #7d40e7;
  margin-left: 10px;
`;

export const View = styled.View``;

export const Head = styled.Text`
  font-weight: bold;
  font-size: 8px;
  color: #999999;
`;

export const Content = styled.Text`
  font-weight: bold;
  font-size: 12px;
  color: #444444;
`;

export const More = styled.Text`
  font-weight: bold;
  font-size: 12px;
  color: #7d40e7;
`;
