import React from 'react';

import PropTypes from 'prop-types';

import { MdMoreHoriz } from 'react-icons/md';

import { Container } from './styles';

export default function Dropdown({ children }) {
  return (
    <Container>
      <MdMoreHoriz className="button" />
      {children}
    </Container>
  );
}

Dropdown.propTypes = {
  children: PropTypes.element.isRequired,
};
