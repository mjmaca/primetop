import React from 'react';
import { string } from 'prop-types';

import SearchIcon from '@material-ui/icons/Search';

import { StyledEmptyState, Title, Description } from './styles';

const EmptyState = props => {
  const { title, description } = props;

  return (
    <StyledEmptyState>
      <SearchIcon style={{ fontSize: 80, color: '#7f7f7f' }} />
      <Title>{title}</Title>
      <Description>{description}</Description>
    </StyledEmptyState>
  );
};

EmptyState.propTypes = {
  title: string,
  description: string,
};

export default EmptyState;
