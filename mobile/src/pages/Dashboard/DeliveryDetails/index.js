import React, { useMemo, useState } from 'react';
import { TouchableOpacity, StatusBar, Alert, View } from 'react-native';
import { useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';

import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '~/services/api';

import {
  Container,
  Content,
  Background,
  Header,
  Body,
  Footer,
  Title,
  Subtitle,
  Value,
  Actions,
  Action,
  Button,
  Anchor,
} from './styles';

export default function DeliveryDetails({ navigation }) {
  const deliverymanId = useSelector((state) => state.auth.profile.id);
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState(navigation.getParam('item'));
  const address = useMemo(() => {
    return `${item.recipient.street}, ${item.recipient.number},  ${item.recipient.city} - ${item.recipient.state}, ${item.recipient.zip_code}`;
  }, [item.recipient]);
  const start = useMemo(() => {
    return item.start_date
      ? format(parseISO(item.start_date), 'dd/MM/Y')
      : '--/--/--';
  }, [item.start_date]);
  const end = useMemo(() => {
    return item.end_date
      ? format(parseISO(item.end_date), 'dd/MM/Y')
      : '--/--/--';
  }, [item.end_date]);

  async function handleStart() {
    setLoading(true);
    try {
      const { data } = await api.put(
        `/deliveries/${deliverymanId}/delivery/${item.id}`
      );
      setLoading(false);
      setItem(data);
      Alert.alert('Cofirmação de retirada', 'Pedido retirado com sucesso');
    } catch (err) {
      setLoading(false);
      Alert.alert(
        'Falha na retirada',
        'O pedido não foi marcado como retirado, tente novamente'
      );
    }
  }
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7d40e7" />

      <Container>
        <Background />
        <Content>
          <Header>
            <Icon name="local-shipping" size={20} color="#7d40e7" />
            <Title>Informações da entrega</Title>
          </Header>
          <Body>
            <Subtitle>DESTINATÁRIO</Subtitle>
            <Value>{item.recipient.name}</Value>
            <Subtitle>ENDEREÇO DE ENTREGA</Subtitle>
            <Value>{address}</Value>
            <Subtitle>PRODUTO</Subtitle>
            <Value>{item.product}</Value>
          </Body>
        </Content>
        <Content>
          <Header>
            <Icon name="event" size={20} color="#7d40e7" />
            <Title>Situação da entrega</Title>
          </Header>
          <Body>
            <Subtitle>STATUS</Subtitle>
            <Value>{item.status.description}</Value>
          </Body>
          <Footer>
            <View>
              <Subtitle>DATA RETIRADA</Subtitle>
              <Value>{start}</Value>
            </View>
            <View>
              <Subtitle>DATA ENTREGA</Subtitle>
              <Value>{end}</Value>
            </View>
          </Footer>
        </Content>
        <Actions>
          <Button>
            <Anchor
              disabled={!item.start_date || item.end_date}
              onPress={() => {
                navigation.navigate('DeliveryProblem', { item });
              }}
            >
              <Icon
                name="highlight-off"
                size={20}
                color={
                  item.start_date && !item.end_date ? '#E74040' : '#999999'
                }
              />
              <Action>Informar Problema</Action>
            </Anchor>
          </Button>
          <Button>
            <Anchor
              disabled={!item.start_date || item.end_date}
              onPress={() => {
                navigation.navigate('DeliveryProblems', { item });
              }}
            >
              <Icon
                name="info-outline"
                size={20}
                color={
                  item.start_date && !item.end_date ? '#E7BA40' : '#999999'
                }
              />
              <Action>Visualizar Problema</Action>
            </Anchor>
          </Button>
          <Button>
            {item.start_date ? (
              <Anchor
                disabled={item.end_date}
                onPress={() => {
                  navigation.navigate('Delivery', { item });
                }}
              >
                <Icon
                  name="check-circle"
                  size={20}
                  color={
                    item.start_date && !item.end_date ? '#7D40E7' : '#999999'
                  }
                />
                <Action>Confirmar Entrega</Action>
              </Anchor>
            ) : (
                <Anchor loading={loading} onPress={handleStart}>
                  <Icon name="check-circle" size={20} color="#7D40E7" />
                  <Action>Confirmar Retirada</Action>
                </Anchor>
              )}
          </Button>
        </Actions>
      </Container>
    </>
  );
}

DeliveryDetails.navigationOptions = ({ navigation }) => ({
  title: 'Detalhes da encomenda',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Deliveries');
      }}
    >
      <Icon name="chevron-left" size={25} color="#fff" />
    </TouchableOpacity>
  ),
});
