import React from 'react';
import PropTypes from 'prop-types';
import {
  CheckboxContainer,
  HiddenCheckbox,
  StyledCheckbox,
  Icon,
} from './styles';

const Checkbox = ({ checked, ...props }) => (
  <CheckboxContainer>
    <HiddenCheckbox checked={checked} {...props} />
    <StyledCheckbox checked={checked}>
      <Icon viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </Icon>
    </StyledCheckbox>
  </CheckboxContainer>
);

export default Checkbox;

Checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
};
