import styled from 'styled-components';

import withStyles from '@material-ui/core/styles/withStyles';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';

export const StyledCESelector = styled.div`
  margin-top: 32px;
  width: 100%;
`;

export const TableTitle = styled.div`
  margin: 8px 0px;
  display: flex;
  justify-content: space-between;
`;

export const Editable = styled.input`
  width: 80px;
`;

export const TableWrapper = styled.div`
  border: 1px solid #373c4d;
  min-height: 200px;
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
