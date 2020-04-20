import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Avatar from '~/components/Avatar';
import { signOut } from '~/store/modules/auth/actions';

import { Profile, Welcome, ProfileName, Button, Left, Text } from './styles';

export default function Dashboard() {
  const dispach = useDispatch();
  const profile = useSelector((state) => state.auth.profile);

  function handleLogout() {
    dispach(signOut());
  }

  return (
    <>
      <Profile>
        <Left>
          <Avatar
            backgroundColor="#F4EFFC"
            textColor="#A28FD0"
            size={68}
            type="circle"
            name={profile.name}
            img={profile.avatar ? profile.avatar.url : null}
          />
          <Welcome>
            <Text>Bem vindo(a) de volta,</Text>
            <ProfileName>{profile.name}</ProfileName>
          </Welcome>
        </Left>
        <Button onPress={handleLogout}>
          <Icon name="input" size={18} color="red" />
        </Button>
      </Profile>
    </>
  );
}
