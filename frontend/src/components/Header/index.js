import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Container, Content } from './styles';
import Menu from '~/components/Menu';
import logo from '~/assets/fastfeet-logo.png';

import { signOut } from '~/store/modules/auth/actions';

export default function Header() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.auth.profile);
  function handleSignOut() {
    dispatch(signOut());
  }
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="FastFeet" />
          <Menu />
        </nav>
        <aside>
          <p>{profile.name}</p>
          <button type="button" onClick={handleSignOut}>
            sair do sistema
          </button>
        </aside>
      </Content>
    </Container>
  );
}
