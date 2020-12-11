/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { array, object, func, number } from 'prop-types';
import { isEmpty } from 'lodash';

import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import RowMenuIcon from '@material-ui/icons/MoreHoriz';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Anchor from '@material-ui/core/Link';

import Pagination from 'components/Pagination';
import EmptyState from 'components/EmptyState';

import { NAMESPACE as PROJECT } from 'containers/ProjectPage/constants';

import { setMode, setPage, setLabor } from '../../../../actions';
import { NAMESPACE } from '../../../../constants';

import { StyledTableHead, StyledTableHeadCell } from './styles';

function Listing(props) {
  const {
    project,
    setMode,
    filter,
    page,
    perPage,
    count,
    setPage,
    labors,
    setLabor,
    permission,
  } = props;
  const [menu, setMenu] = useState(null); // e.currentTarget or null
  const [item, setItem] = useState({});

  const handleOnClickItem = item => () => {
    setLabor(item);
    setMode('view');
  };

  const handleOnMenuOpen = item => e => {
    setItem(item);
    setMenu(e.currentTarget);
  };

  const handleOnView = () => {
    setLabor(item);
    setItem({});
    setMenu(null);
    setMode('view');
  };

  const handleOnEdit = () => {
    setLabor(item);
    setItem({});
    setMenu(null);
    setMode('edit');
  };

  const getLabors = () => {
    const { date, keyword } = filter;

    return labors
      .filter(({ l_no, created_date }) => {
        if (keyword) {
          return l_no.toLowerCase().includes(keyword.toLowerCase());
        }

        if (date) {
          const base = [date.getFullYear(), date.getMonth(), date.getDate()];
          const start = new Date(...base, 0, 0);
          const end = new Date(...base, 23, 59);

          return created_date.toDate() >= start && created_date.toDate() <= end;
        }

        return true;
      })
      .slice((page - 1) * perPage, page * perPage);
  };

  const labor_items = getLabors();

  return (
    <Grid
      container
      style={{ marginTop: 16, minHeight: 200, flexGrow: 1, flexFlow: 'column' }}
    >
      <Menu
        anchorEl={menu}
        keepMounted
        open={Boolean(menu)}
        onClose={() => setMenu(null)}
      >
        <MenuItem onClick={handleOnView} style={{ fontSize: 12 }}>
          View
        </MenuItem>
        {permission.edit && (
          <MenuItem onClick={handleOnEdit} style={{ fontSize: 12 }}>
            Edit
          </MenuItem>
        )}
      </Menu>
      <Table size="small">
        <StyledTableHead>
          <TableRow>
            <StyledTableHeadCell>Labor No.</StyledTableHeadCell>
            <StyledTableHeadCell align="center">
              Payment Date
            </StyledTableHeadCell>
            <StyledTableHeadCell>Project</StyledTableHeadCell>
            <StyledTableHeadCell>Project Location</StyledTableHeadCell>
            <StyledTableHeadCell align="center">
              Project Type
            </StyledTableHeadCell>
            <StyledTableHeadCell width={40} />
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {labor_items.map(item => {
            const { id, l_no, created_date } = item;

            return (
              <TableRow key={id}>
                <TableCell>
                  <Anchor
                    style={{ cursor: 'pointer', color: 'initial' }}
                    onClick={handleOnClickItem(item)}
                  >
                    {l_no}
                  </Anchor>
                </TableCell>
                <TableCell align="center">
                  {moment(
                    created_date.toDate ? created_date.toDate() : created_date,
                  ).format('MM-DD-YYYY')}
                </TableCell>
                <TableCell>{project.name}</TableCell>
                <TableCell>{project.province}</TableCell>
                <TableCell align="center">{project.type}</TableCell>
                <TableCell align="center">
                  <RowMenuIcon onClick={handleOnMenuOpen(item)} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {!isEmpty(labor_items) ? (
        <Grid container justify="flex-end" style={{ marginTop: 32 }}>
          <Pagination
            count={count}
            page={page}
            perPage={perPage}
            onChange={setPage}
          />
        </Grid>
      ) : isEmpty(labors) ? (
        <EmptyState
          title="No Results Found"
          description="Start adding new Labors now"
        />
      ) : (
        <EmptyState
          title="Sad, No Results Found"
          description="Unfortunately, I could not find any results matching your search"
        />
      )}
    </Grid>
  );
}

Listing.propTypes = {
  project: object,
  setMode: func,
  filter: object,
  permission: object,
  page: number,
  perPage: number,
  count: number,
  setPage: func,
  labors: array,
  setLabor: func,
};

const mapStateToProps = state => {
  const {
    [NAMESPACE]: {
      count,
      page,
      perPage,
      filter,
      labors: { labors },
    },
    [PROJECT]: { project },
  } = state;

  return {
    project,
    filter,
    page,
    perPage,
    count,
    labors,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ setMode, setPage, setLabor }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Listing);
