import withStyles from '@material-ui/core/styles/withStyles';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';

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
