/**
 *
 * AccessMatrix
 *
 */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { roles as RolesList } from '../../helpers/userRoles';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableContainer: {
    marginBottom: 16,
  },
  leftColumnHeader: {
    width: 200,
    color: '#ffffff',
  },
  header: {
    backgroundColor: '#3f51b5',
  },
  rightColumnHeader: {
    color: '#ffffff',
  },
});

const roleName = {
  free: 'Free Users',
  co: 'Contractor',
  pm: 'Project Manager',
  qs: 'Quantity Surveryo',
  se: 'Site Engineer',
  po: 'Purchasor',
};

function AccessMatrix() {
  const classes = useStyles();

  const renderRows = permissions => {
    const ps = Object.entries(permissions);
    return ps.map(permission => (
      <TableRow key={permission[0]}>
        <TableCell align="left">{permission[0]}</TableCell>
        <TableCell scope="row">{permission[1].join(', ')}</TableCell>
      </TableRow>
    ));
  };

  return (
    <div>
      {RolesList.map(item => (
        <TableContainer className={classes.tableContainer} component={Paper}>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead className={classes.header}>
              <TableRow>
                <TableCell className={classes.leftColumnHeader}>
                  {roleName[item.role]}
                </TableCell>
                <TableCell className={classes.rightColumnHeader} align="left">
                  Access
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{renderRows(item.permissions)}</TableBody>
          </Table>
        </TableContainer>
      ))}
    </div>
  );
}

AccessMatrix.propTypes = {};

export default AccessMatrix;
