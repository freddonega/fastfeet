import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { pt } from 'date-fns/locale/pt';
import { parseISO, format } from 'date-fns';

import StepIndicator from 'react-native-step-indicator';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Header,
  Timeline,
  Footer,
  Title,
  View,
  Head,
  Content,
  More,
} from './styles';

export default function DeliveryList({ item, seeMore }) {
  const dateFormated = useMemo(() => {
    return format(parseISO(item.createdAt), 'd/MM/yyyy', {
      locale: pt,
    });
  }, [item.createdAt]);

  item.nameFormated = useMemo(() => {
    return item.id <= 9 ? `Encomenda 0${item.id}` : `Encomenda ${item.id}`;
  }, [item.id]);
  const labels = ['Aguardando Retirada', 'Retirada', 'Entregue'];
  const customStyles = {
    stepIndicatorSize: 10,
    currentStepIndicatorSize: 10,
    stepStrokeCurrentColor: '#7D40E7',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#7D40E7',
    stepStrokeUnFinishedColor: '#999999',
    separatorFinishedColor: '#7D40E7',
    separatorUnFinishedColor: '#999999',
    stepIndicatorFinishedColor: '#7D40E7',
    stepIndicatorUnFinishedColor: '#999999',
    stepIndicatorCurrentColor: '#7D40E7',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#7D40E7',
    stepIndicatorLabelFinishedColor: '#7D40E7',
    stepIndicatorLabelUnFinishedColor: '#999999',
    labelColor: '#999999',
    labelSize: 12,
    currentStepLabelColor: '#7D40E7',
  };
  return (
    <Container>
      <Header>
        <Icon name="local-shipping" size={20} color="#7d40e7" />
        <Title>{item.nameFormated}</Title>
      </Header>
      <Timeline>
        <StepIndicator
          customStyles={customStyles}
          currentPosition={item.status.id}
          labels={labels}
          stepCount={3}
          useNativeDriver
        />
      </Timeline>
      <Footer>
        <View>
          <Head>Data</Head>
          <Content>{dateFormated}</Content>
        </View>
        <View>
          <Head>Cidade</Head>
          <Content>{item.recipient.city}</Content>
        </View>
        <View>
          <TouchableOpacity onPress={() => seeMore(item)}>
            <More>Ver Detalhes</More>
          </TouchableOpacity>
        </View>
      </Footer>
    </Container>
  );
}

DeliveryList.propTypes = {
  item: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  seeMore: PropTypes.func.isRequired,
};
