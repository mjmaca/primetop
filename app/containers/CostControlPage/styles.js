import styled from 'styled-components';

import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';

export const Tabs = styled.div`
  display: flex;
  align-items: center;
`;

export const Tab = styled.div`
  &::after {
    content: ' ';
    display: block;
    width: 100%;
    height: 2px;
    background-color: ${props => (props.isActive ? '#f50057' : 'transparent')};
  }
`;

export const StyledTabButton = withStyles(() => ({
  root: {
    width: 160,
    height: 48,
    fontFamily: 'sans-serif',
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.75,
    letterSpacing: '0.02857em',
    textTransform: 'uppercase',
  },
}))(ButtonBase);

export const StyledButton = withStyles(() => ({
  root: {
    width: 120,
    borderRadius: 4,
    fontSize: 10,
    textTransform: 'none',
    fontWeight: 'normal',
    color: props => (props.variant === 'contained' ? '#fff' : '#BF0E08'),
    backgroundColor: props => (props.variant === 'contained' ? '#BF0E08' : ''),
    borderColor: '#BF0E08',
    '&:hover': {
      color: '#fff',
      backgroundColor: '#EC4C47',
    },
  },
  disabled: {
    backgroundColor: `#eaeaea`,
  },
}))(Button);

export const Loading = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .MuiCircularProgress-root {
    margin-bottom: 16px;
    color: #3f51b5 !important;
  }
`;

export const EmptyState = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .MuiSvgIcon-root {
    margin-bottom: 8px;
  }
`;

export const WelcomeWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const WelcomeMessage = styled.div`
  font-size: 16px;
  color: #4b4b4b;
  margin-bottom: 16px;
`;
