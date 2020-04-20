import React, { useState } from 'react';
import { TouchableOpacity, StatusBar, TextInput, Alert } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Background, Form, SubButton } from './styles';
import api from '~/services/api';

export default function DeliveryProblem({ navigation }) {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const item = navigation.getParam('item');

  async function handleSubmit() {
    setLoading(true);
    try {
      await api.post(`/deliveries/${item.id}/problems`, {
        description,
      });
      setLoading(false);
      setDescription('');
      Alert.alert(
        'Problema enviado',
        'O problema na entrega foi enviado com sucesso'
      );
    } catch (err) {
      setLoading(false);
      Alert.alert(
        'Falha no envio',
        'O problema não foi enviado, tente novamente'
      );
    }
  }
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7d40e7" />

      <Container>
        <Background />
        <Form>
          <TextInput
            multiline
            numberOfLines={10}
            placeholder="Informe seu ID de cadastro"
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={description}
            onChangeText={setDescription}
            style={{ height: 300, textAlignVertical: 'top' }}
          />
        </Form>
        <SubButton loading={loading} onPress={handleSubmit}>
          Enviar
        </SubButton>
      </Container>
    </>
  );
}

DeliveryProblem.navigationOptions = ({ navigation }) => ({
  title: 'Informar problema',
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
