/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
/* eslint-disable default-case */
/* eslint-disable no-unused-expressions */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { array, object, func, number } from 'prop-types';
import { isEmpty } from 'lodash';
import { useParams } from 'react-router-dom';

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
import { NAMESPACE as ORGANIZATION } from 'containers/OrganizationPage/constants';
import { fetchCompany } from 'containers/OrganizationPage/actions';

import {
  setPurchaseOrder,
  setMode,
  setPage,
  deletePurchaseOrder,
} from '../../../../actions';
import { NAMESPACE } from '../../../../constants';

import { Legend, warning, success } from '../../styles';
import { StyledTableHead, StyledTableHeadCell } from './styles';

import excel from './excel';
import pdf from './pdf';

function Listing(props) {
  const {
    purchaseOrders,
    project,
    setPurchaseOrder,
    fetchCompany,
    setMode,
    filter,
    page,
    perPage,
    count,
    setPage,
    permission,
    deletePurchaseOrder,
  } = props;
  const { projectId } = useParams();
  const [menu, setMenu] = useState(null); // e.currentTarget or null
  const [item, setItem] = useState({});

  useEffect(() => {
    fetchCompany();
  }, []);

  const handleOnClickPO = item => () => {
    setPurchaseOrder(item);
    setMode('view');
  };

  const handleOnMenuOpen = item => e => {
    setItem(item);
    setMenu(e.currentTarget);
  };

  const handleOnView = () => {
    setPurchaseOrder(item);
    setItem({});
    setMenu(null);
    setMode('view');
  };

  const handleOnEdit = () => {
    setPurchaseOrder(item);
    setItem({});
    setMenu(null);
    setMode('edit');
  };

  const handleOnDelete = () => {
    if (confirm('Are you sure you want to delete this PO?')) {
      deletePurchaseOrder(projectId, { ...item, status: 'archived' });
    }
    setItem({});
    setMenu(null);
  };

  const handleOnDownload = (file_type, type) => {
    switch (file_type) {
      case 'excel':
        excel({ ...props, purchaseOrder: item, type });
        break;
      case 'pdf':
        pdf({ ...props, purchaseOrder: item, type });
        break;
    }
    setItem({});
    setMenu(null);
  };

  const getPurchaseOrders = () => {
    const { date, keyword } = filter;

    return [
      ...purchaseOrders
        .filter(({ po_no, created_date }) => {
          if (keyword) {
            return po_no.toLowerCase().includes(keyword.toLowerCase());
          }

          if (date) {
            const base = [date.getFullYear(), date.getMonth(), date.getDate()];
            const start = new Date(...base, 0, 0);
            const end = new Date(...base, 23, 59);

            return (
              created_date.toDate() >= start && created_date.toDate() <= end
            );
          }

          return true;
        })
        .slice((page - 1) * perPage, page * perPage),
    ];
  };

  const orders = getPurchaseOrders();

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
        <MenuItem
          onClick={() => handleOnDownload('excel', 'report')}
          style={{ fontSize: 12 }}
        >
          Dowload Excel
        </MenuItem>
        <MenuItem
          onClick={() => handleOnDownload('pdf', 'supplier')}
          style={{ fontSize: 12 }}
        >
          Download PDF
        </MenuItem>
        {permission.delete && (
          <MenuItem onClick={handleOnDelete} style={{ fontSize: 12 }}>
            Delete
          </MenuItem>
        )}
      </Menu>
      <Table size="small">
        <StyledTableHead>
          <TableRow>
            <StyledTableHeadCell width={40} />
            <StyledTableHeadCell>PO No.</StyledTableHeadCell>
            <StyledTableHeadCell>Project</StyledTableHeadCell>
            <StyledTableHeadCell>Supplier</StyledTableHeadCell>
            <StyledTableHeadCell align="center">
              Payment Method
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center">
              Total Amount
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center">Date</StyledTableHeadCell>
            <StyledTableHeadCell width={40} />
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {orders.map(item => {
            const {
              id,
              po_no,
              supplier = {},
              payment_method,
              grand_total,
              created_date,
              status,
            } = item;
            const { name } = supplier;
            const colors = { pending: warning, approved: success };

            return (
              <TableRow key={id}>
                <TableCell align="center">
                  <Legend color={colors[status]} />
                </TableCell>
                <TableCell>
                  <Anchor
                    style={{ cursor: 'pointer', color: 'initial' }}
                    onClick={handleOnClickPO(item)}
                  >
                    {po_no}
                  </Anchor>
                </TableCell>
                <TableCell>{project.name}</TableCell>
                <TableCell>{name}</TableCell>
                <TableCell align="center">{payment_method}</TableCell>
                <TableCell align="center">
                  ₱ {grand_total.toLocaleString()}
                </TableCell>
                <TableCell align="center">
                  {moment(
                    created_date.toDate ? created_date.toDate() : created_date,
                  ).format('MM-DD-YYYY')}
                </TableCell>
                <TableCell align="center">
                  <RowMenuIcon onClick={handleOnMenuOpen(item)} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {!isEmpty(orders) ? (
        <Grid container justify="flex-end" style={{ marginTop: 32 }}>
          <Pagination
            count={count}
            page={page}
            perPage={perPage}
            onChange={setPage}
          />
        </Grid>
      ) : isEmpty(purchaseOrders) ? (
        <EmptyState
          title="No Results Found"
          description="Start adding new Purchase Order now"
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
  purchaseOrders: array,
  project: object,
  setPurchaseOrder: func,
  fetchCompany: func,
  setMode: func,
  filter: object,
  page: number,
  perPage: number,
  count: number,
  setPage: func,
  permission: object,
  deletePurchaseOrder: func,
};

const mapStateToProps = state => {
  const {
    [NAMESPACE]: {
      count,
      page,
      perPage,
      filter,
      purchaseOrders: { purchaseOrders },
    },
    [PROJECT]: { project },
    [ORGANIZATION]: { company },
  } = state;

  return {
    purchaseOrders,
    project,
    filter,
    page,
    perPage,
    count,
    company, // needed for pdf
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { setPurchaseOrder, setMode, setPage, fetchCompany, deletePurchaseOrder },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Listing);
