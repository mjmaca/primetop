import styled from 'styled-components';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

export const ActionWrapper = styled.div`
  display: flex;
  align-items: center;
  .label {
    margin-right: 8px;
    font-size: 12px;
    font-weight: bold;
  }
`;

export const AttachmentWrapper = styled.div`
  min-width: 400px;
  margin-top: 4px;

  display: flex;
  flex-wrap: wrap;
`;

export const Attachment = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 4px;
  border: 1px solid #ddd;
  margin: 4px;
  cursor: pointer;

  background: url(${props => props.url});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const StyledAddButton = withStyles(() => ({
  root: {
    width: 120,
    borderRadius: 4,
    fontSize: 10,
    fontWeight: 500,
    color: '#47B881',
    borderColor: '#47B881',
    '&:hover': {
      borderColor: '#D4EEE2',
      backgroundColor: '#D4EEE2',
    },
  },
}))(Button);
