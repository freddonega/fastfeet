import styled from 'styled-components/native';
import { BaseButton } from 'react-native-gesture-handler';

export const Profile = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Welcome = styled.View`
  margin-left: 15px;
`;

export const ProfileName = styled.Text`
  font-size: 22px;
  font-weight: bold;
`;

export const Text = styled.Text`
  font-size: 12px;
`;

export const Button = styled(BaseButton)``;

export const Left = styled.View`
  flex-direction: row;
  align-items: center;
`;
