import React, { useState, useEffect } from 'react';
import { MdMenu } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import { MainMenu, NavList, NavItem } from './styles';

export default function Menu() {
  const pathname = useLocation().pathname.split('/')[1];
  const [visible, setVisible] = useState(false);
  const menuitems = [
    {
      name: 'ENCOMENDAS',
      url: '/packages',
      active: pathname === 'packages',
    },
    {
      name: 'ENTREGADORES',
      url: '/deliverymen',
      active: pathname === 'deliverymen',
    },
    {
      name: 'DESTINATÁRIOS',
      url: '/recipients',
      active: pathname === 'recipients',
    },
    {
      name: 'PROBLEMAS',
      url: '/problems',
      active: pathname === 'problems',
    },
  ];
  const [menus, setMenus] = useState(menuitems);

  useEffect(() => {
    setMenus(menuitems);
  }, [pathname]);

  function handleToggleVisible() {
    setVisible(!visible);
  }
  return (
    <MainMenu>
      <MdMenu
        onClick={handleToggleVisible}
        color="#444444"
        size={20}
        className="menu-mobile"
      />
      <NavList visible={visible}>
        {menus.map((menu, key) => (
          <NavItem key={String(key)} active={menu.active}>
            <Link to={menu.url}>{menu.name}</Link>
          </NavItem>
        ))}
      </NavList>
    </MainMenu>
  );
}
