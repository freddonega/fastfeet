import React, { forwardRef } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import { Container, TInput } from './styles';

function TArea({ style, icon, ...rest }, ref) {
  return (
    <Container style={style}>
      {icon && <Icon name={icon} size={20} color="#999" />}
      <TInput {...rest} ref={ref} hasIcon={!!icon} />
    </Container>
  );
}

TArea.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  icon: PropTypes.string,
};

TArea.defaultProps = {
  style: {},
  icon: null,
};

export default forwardRef(TArea);
