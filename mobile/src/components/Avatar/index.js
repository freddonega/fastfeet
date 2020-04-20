import React from 'react';
import TextAvatar from 'react-native-text-avatar';
import PropTypes from 'prop-types';

import { ImageAvatar, Photo } from './styles';

export default function Avatar({ name, img, ...rest }) {
  return !img ? (
    <TextAvatar {...rest}>{name}</TextAvatar>
  ) : (
      <ImageAvatar {...rest}>
        <Photo
          source={{
            uri: __DEV__ ? img.replace('localhost', '192.168.1.4') : img,
          }}
        />
      </ImageAvatar>
    );
}

Avatar.propTypes = {
  name: PropTypes.string.isRequired,
  img: PropTypes.string,
};

Avatar.defaultProps = {
  img: null,
};
