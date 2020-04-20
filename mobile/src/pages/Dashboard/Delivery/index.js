import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { TouchableOpacity, StatusBar, Alert } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import ImageUpload from '~/components/ImageUpload';

import api from '~/services/api';

import { Container, Background, SubButton, Content } from './styles';

export default function Delivery({ navigation }) {
  const [photo, setPhoto] = useState();
  const [loading, setLoading] = useState(false);

  const delivery = navigation.getParam('item');
  const deliverymanId = useSelector((state) => state.auth.profile.id);

  function handlePhoto(data) {
    setPhoto(data);
  }

  async function handleSubmit() {
    setLoading(true);
    const dataFile = new FormData();
    dataFile.append('file', {
      type: 'image/jpg',
      uri: photo,
      name: 'assignature.jpg',
    });

    try {
      const { data } = await api.post('files', dataFile);
      console.tron.log(data);
      await api.post(`/deliveries/${deliverymanId}/delivery/${delivery.id}`, {
        signature_id: data.id,
      });
      setLoading(false);
      setPhoto();
      Alert.alert('Assinatura enviada', 'A entrega foi registrada com sucesso');
      navigation.navigate('Deliveries');
    } catch (err) {
      setLoading(false);
      Alert.alert(
        'Falha no envio',
        'A entrega não foi registrada, tente novamente'
      );
    }
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7d40e7" />

      <Container>
        <Background />
        <Content>
          <ImageUpload handlePhoto={handlePhoto} />
          <SubButton loading={loading} onPress={handleSubmit}>
            Enviar
          </SubButton>
        </Content>
      </Container>
    </>
  );
}

Delivery.navigationOptions = ({ navigation }) => ({
  title: 'Confirmar entrega',
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
