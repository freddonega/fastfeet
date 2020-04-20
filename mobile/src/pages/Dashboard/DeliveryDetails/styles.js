import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  background: #fff;
`;

export const Content = styled.View`
  background: #fff;
  border-color: #f8f9fd;
  border-top-width: 0;
  border-left-width: 0;
  border-bottom-width: 0;
  border-right-width: 0;
  elevation: 5;
  margin: 20px;
  margin-top: 0px;
  min-height: 100px;
  padding: 20px;
  border: 1px solid;

  border-radius: 4px;
`;

export const Background = styled.View`
  background: #7d40e7;
  height: 100px;
  margin-bottom: -80px;
`;

export const Header = styled.View`
  flex-direction: row;
`;

export const Body = styled.View``;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-size: 14px;
  font-weight: bold;
  margin-left: 10px;
  color: #7d40e7;
`;

export const Subtitle = styled.Text`
  margin-top: 10px;
  font-size: 16px;
  font-weight: bold;
  color: #999999;
`;

export const Value = styled.Text`
  font-size: 14px;
  color: #666666;
`;
export const Actions = styled.View`
  flex-direction: row;
  background: #f8f9fd;
  border-color: #f8f9fd;
  border-top-width: 0;
  border-left-width: 0;
  border-bottom-width: 0;
  border-right-width: 0;
  elevation: 5;
  margin: 20px;
  margin-top: 0px;
  border: 1px solid;
  border-radius: 4px;
  align-items: stretch;
`;
export const Button = styled.View`
  align-items: center;
  align-content: flex-end;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 30px;

  flex: 1;
`;
export const Action = styled.Text`
  font-size: 12px;
  color: #999999;
  text-align: center;
`;

export const Anchor = styled(TouchableOpacity)`
  align-items: center;
`;
