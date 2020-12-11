import styled from 'styled-components';

import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Cancel from '@material-ui/icons/Cancel';

export const StyledOrganization = styled.div`
  width: 100%;
  max-width: 1000px;
  margin-top: 16px;
  padding: 16px;
`;

export const AddNewMemberWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 16px;
`;

export const InvitationBox = styled.div`
  width: 300px;
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 500;
`;

export const CodeNumber = styled.span`
  font-size: 1rem;
  color: #f44336;
`;

export const StyledButton = withStyles(() => ({
  root: {
    width: 200,
    borderRadius: 24,
    fontSize: 12,
    textTransform: 'none',
    fontWeight: 'normal',
    color: '#fff',
    backgroundColor: '#BF0E08',
    '&:hover': {
      backgroundColor: '#EC4C47',
    },
  },
}))(Button);

export const StyledCancelIcon = withStyles(() => ({
  root: {
    position: 'absolute',
    right: 4,
    top: 4,
    color: '#66788A',
    cursor: 'pointer',
  },
}))(Cancel);

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
