import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { format, parseISO } from 'date-fns';
import { View } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { signOut } from '~/store/modules/auth/actions';

import { Container, Photo, Label, Value, SubButton } from './styles';

export default function Dashboard() {
  const dispach = useDispatch();
  const profile = useSelector((state) => state.auth.profile);
  const dateFormated = useMemo(() => {
    return profile.createdAt
      ? format(parseISO(profile.createdAt), 'dd/MM/Y')
      : '--/--/--';
  }, [profile.createdAt]);
  function handleLogout() {
    dispach(signOut());
  }
  return (
    <Container>
      <Photo
        backgroundColor="#F4EFFC"
        textColor="#A28FD0"
        size={136}
        type="circle"
        name={profile.name}
        img={profile.avatar ? profile.avatar.url : null}
      />
      <Label>Nome completo</Label>
      <Value>{profile.name}</Value>
      <Label>Email</Label>
      <Value>{profile.email}</Value>
      <Label>Data de cadastro</Label>
      <Value>{dateFormated}</Value>

      <SubButton onPress={handleLogout}>Logout</SubButton>
    </Container>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meu Perfil',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="account-circle" size={20} color={tintColor} />
  ),
};
