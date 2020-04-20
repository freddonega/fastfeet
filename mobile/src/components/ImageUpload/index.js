import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, Button, Camera, Content, Image } from './styles';

export default function ImageUpload({ handlePhoto }) {
  const [photo, setPhoto] = useState();
  const [camera, setCamera] = useState();
  const options = { quality: 0.5, base64: true };

  useEffect(() => {
    handlePhoto(photo);
  }, [photo]);

  const PendingView = () => <></>;
  async function takePicture() {
    if (camera) {
      const data = await camera.takePictureAsync(options);
      setPhoto(data.uri);
    }
  }

  return (
    <Container>
      {!photo ? (
        <Camera
          ref={(ref) => {
            setCamera(ref);
          }}
          captureAudio={false}
          type={Camera.Constants.Type.back}
          flashMode={Camera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        >
          {({ camera, status }) => {
            if (status !== 'READY') return <PendingView />;
            return (
              <Button onPress={() => takePicture(camera)}>
                <Icon name="camera-alt" size={30} color="#fff" />
              </Button>
            );
          }}
        </Camera>
      ) : (
          <Content>
            <Image source={{ uri: photo }} />
            <Button onPress={() => setPhoto(null)}>
              <Icon name="close" size={30} color="#fff" />
            </Button>
          </Content>
        )}
    </Container>
  );
}

ImageUpload.propTypes = {
  handlePhoto: PropTypes.func.isRequired,
};
