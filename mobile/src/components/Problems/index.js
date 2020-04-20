import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';

import { Container, Problem, Date } from './styles';

export default function Problems({ item }) {
  const dateFormated = useMemo(() => {
    return item.createdAt
      ? format(parseISO(item.createdAt), 'dd/MM/Y')
      : '--/--/--';
  }, [item.createdAt]);
  return (
    <Container>
      <Problem>{item.description}</Problem>
      <Date>{dateFormated}</Date>
    </Container>
  );
}

Problems.propTypes = {
  item: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};
