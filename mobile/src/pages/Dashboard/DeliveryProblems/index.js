import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StatusBar, Alert } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import { Container, Background, Title, List } from './styles';
import Problems from '~/components/Problems';

export default function DeliveryDetails({ navigation }) {
  const delivery = navigation.getParam('item');

  const [items, setItems] = useState([]);

  useEffect(() => {
    async function loadItems() {
      try {
        const { data } = await api.get(`/deliveries/${delivery.id}/problems`);
        setItems(data);
      } catch (err) { }
    }

    loadItems();
  }, [delivery.id]);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7d40e7" />

      <Container>
        <Background />
        <Title>{delivery.nameFormated}</Title>
        <List
          data={items}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <Problems item={item} />}
        />
      </Container>
    </>
  );
}

DeliveryDetails.navigationOptions = ({ navigation }) => ({
  title: 'Visualizar problemas',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('DeliveryDetails');
      }}
    >
      <Icon name="chevron-left" size={25} color="#fff" />
    </TouchableOpacity>
  ),
});
