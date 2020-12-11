import styled from 'styled-components';

import withStyles from '@material-ui/core/styles/withStyles';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';

export const FormInput = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  position: relative;
`;

export const SectionLabel = styled.div`
  display: flex;
  padding: 8px;
  background-color: #373c4d;
  color: #fff;
  font-size: 14px;
  height: 32px;
  align-items: center;
  font-weight: 500;
`;

export const DetailLabel = styled.div`
  margin: 10px 12px;
  font-size: 14px;
  font-weight: 500;
`;

export const AttachmentWrapper = styled.div`
  margin-top: 32px;
  max-width: 400px;
`;

export const StyledInputLabel = withStyles(() => ({
  root: {
    marginRight: 8,
    width: '25%',
    fontSize: 12,
    fontWeight: 500,
  },
}))(InputLabel);

export const StyledTextField = withStyles(() => ({
  root: {
    width: '75%',
  },
}))(TextField);

export const StyledSelect = withStyles(theme => ({
  root: {
    width: '75%',
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      backgroundColor: '#fff',
    },
  },
}))(InputBase);

export const ErrorMessage = styled.div`
  position: absolute;
  bottom: -8px;
  right: 16px;
  font-size: 12px;
  color: #ec4c47;
`;

export const StyledTableHead = withStyles(() => ({
  root: {
    backgroundColor: '#373c4d',
  },
}))(TableHead);

export const StyledTableHeadCell = withStyles(() => ({
  root: {
    color: '#fff',
  },
}))(TableCell);

export const StyledAddItemButton = withStyles(() => ({
  root: {
    color: '#fff',
    backgroundColor: '#1070CA',
    fontSize: 12,
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#3885cd',
    },
  },
}))(Button);
