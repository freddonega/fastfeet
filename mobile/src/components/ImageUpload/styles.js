import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RNCamera } from 'react-native-camera';

export const Container = styled.View`
  flex: 1;
`;

export const Camera = styled(RNCamera)`
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
  border-radius: 4px;
`;

export const Content = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
`;

export const Image = styled.Image`
  flex: 1;
  border-radius: 4px;
  margin-bottom: -80px;
`;

export const Button = styled(TouchableOpacity)`
  flex-direction: column;
  align-self: center;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  width: 60px;
  height: 60px;
  border-radius: 60px;
  margin-bottom: 10px;
`;
