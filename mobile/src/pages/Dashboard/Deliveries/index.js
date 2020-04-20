import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { StatusBar, TouchableOpacity } from 'react-native';
import { withNavigationFocus } from 'react-navigation';

import Welcome from '~/components/Welcome';
import DeliveryList from '~/components/DeliveryList';

import { Container, Content, Title, Header, Nav, Anchor, List } from './styles';

import api from '~/services/api';

function Deliveries({ isFocused, navigation }) {
  const [filter, setFilter] = useState({ page: 1, limit: 3, delivered: 0 });
  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState([]);
  const deliverymanId = useSelector((state) => state.auth.profile.id);

  async function loadItems(add = false) {
    const { data } = await api.get(`/deliveries/${deliverymanId}`, {
      params: filter,
    });

    const { count, rows } = data;

    setTotalPages(count);
    if (add) {
      setItems([...items, ...rows]);
    } else {
      setItems(rows);
    }
  }
  useEffect(() => {
    loadItems(true);
  }, [filter]);
  useEffect(() => {
    if (isFocused) {
      setItems([]);
      setFilter({ page: 1, limit: 3, delivered: 0 });
    }
  }, [isFocused]);

  function handleDelivered(status) {
    setItems([]);
    setFilter({ page: 1, limit: 3, delivered: status });
  }
  function handleLoadMore() {
    if (filter.page * filter.limit <= totalPages) {
      setFilter({ ...filter, page: filter.page + 1 });
    }
  }
  function handleDelivery(item) {
    navigation.navigate('DeliveryDetails', { item });
  }
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <Container>
        <Content>
          <Welcome />
          <Header>
            <Title>Entregas</Title>
            <Nav>
              <TouchableOpacity onPress={() => handleDelivered(0)}>
                <Anchor active={filter.delivered === 0}>Pendentes</Anchor>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelivered(1)}>
                <Anchor active={filter.delivered === 1}>Entregues</Anchor>
              </TouchableOpacity>
            </Nav>
          </Header>
        </Content>

        <List
          data={items}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <DeliveryList item={item} seeMore={handleDelivery} />
          )}
          onEndReached={handleLoadMore}
        />
      </Container>
    </>
  );
}

Deliveries.navigationOptions = {
  headerShown: false,
};

export default withNavigationFocus(Deliveries);
