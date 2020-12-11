import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import { withStyles } from '@material-ui/core/styles';

export const CEHeader = styled(Grid)`
  height: 48px;
  align-items: center;
  background-color: #fff;
  padding: 0px 8px;
`;

export const CETitle = styled.span`
  font-weight: 600;
`;

export const CETotal = styled.span`
  font-weight: 600;
`;

export const FormInput = styled(Grid)`
  justify-content: center;
  margin: 8px 0px;
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

export const StyledExpansionPanel = withStyles(() => ({
  root: {
    backgroundColor: '#373c4d',
  },
  expanded: {
    margin: `0px !important`,
    marginBottom: `0px !important`,
  },
}))(ExpansionPanel);

export const StyledExpansionPanelSummary = withStyles(() => ({
  root: {
    minHeight: 32,
  },
  expanded: {
    minHeight: `32px  !important`,
    alignItems: `center`,
  },
  content: {
    color: '#EDF0F2',
    fontSize: 14,
    fontWeight: 600,
    margin: '0px !important',
  },
  expandIcon: {
    padding: '0px 12px',
    color: '#fff',
  },
}))(ExpansionPanelSummary);

export const StyledExpansionPanelDetails = withStyles(() => ({
  root: {
    backgroundColor: '#fff',
  },
}))(ExpansionPanelDetails);
