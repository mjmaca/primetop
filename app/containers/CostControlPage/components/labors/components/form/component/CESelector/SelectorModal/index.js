/* eslint-disable dot-notation */
/* eslint-disable arrow-body-style */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { array, func, bool } from 'prop-types';
import { isEmpty } from 'lodash';

import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';

import CircularProgress from '@material-ui/core/CircularProgress';
import WarningIcon from '@material-ui/icons/Warning';

import Pagination from 'components/Pagination';

import {
  StyledButton,
  EmptyState,
  Loading,
} from 'containers/CostControlPage/styles';

import { NAMESPACE as SCHEDULE } from 'containers/SchedulePage/constants';
import { NAMESPACE } from 'containers/CostControlPage/constants';

import { StyledTableHead, StyledTableHeadCell } from '../styles';

function SelectorModal(props) {
  const {
    estimates,
    schedules,
    items,
    onChange,
    onCancel,
    fetchingEstimates,
    fetchingSchedule,
  } = props;
  const [selectedItems, setSelectedItems] = useState([...items]);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 5;

  const handleOnChange = item => e => {
    if (e.target.checked) {
      const selectedItem = { ...item };

      setSelectedItems([...selectedItems, selectedItem]);
    } else {
      const index = selectedItems.findIndex(({ id }) => id === item.id);

      setSelectedItems([
        ...selectedItems.slice(0, index),
        ...selectedItems.slice(index + 1),
      ]);
    }
  };

  const handleOnSubmit = () => {
    onChange(selectedItems);
  };

  const handleOnCancel = () => {
    onCancel();
  };

  const getFilteredEstimates = () => {
    let items = [];

    estimates.forEach(({ labor_cost, schedule_id }) => {
      const schedule = schedules.find(({ id }) => id === schedule_id) || {};

      items = [
        ...items,
        ...labor_cost.map(item => {
          // eslint-disable-next-line no-param-reassign
          item.schedule = schedule;
          return item;
        }),
      ];
    });

    return items.filter(item => {
      const { personnel, type, schedule = {} } = item;

      if (keyword) {
        return `${personnel} ${type} ${schedule.text}`
          .toLowerCase()
          .includes(keyword.toLowerCase());
      }

      return true;
    });
  };

  const filteredEstimates = getFilteredEstimates();

  const renderItems = () => {
    return filteredEstimates
      .slice((page - 1) * perPage, page * perPage)
      .map(item => {
        const {
          id,
          personnel,
          type,
          quantity,
          working_days,
          rate,
          amount,
          schedule,
        } = item;
        const isSelected = Boolean(
          selectedItems.find(({ id }) => id === item.id),
        );

        return (
          <TableRow key={id}>
            <TableCell width={40}>
              <Checkbox
                checked={isSelected}
                onChange={handleOnChange(item)}
                color="primary"
              />
            </TableCell>
            <TableCell>{personnel}</TableCell>
            <TableCell>{schedule.text}</TableCell>
            <TableCell>{type}</TableCell>
            <TableCell align="center">{quantity}</TableCell>
            <TableCell align="center">{working_days}</TableCell>
            <TableCell align="center">{rate}</TableCell>
            <TableCell align="center">₱ {amount.toLocaleString()}</TableCell>
          </TableRow>
        );
      });
  };

  const isLoading = fetchingEstimates || fetchingSchedule;
  const hasEstimates = !isEmpty(filteredEstimates);

  return (
    <Grid container style={{ padding: 16 }}>
      <Grid container justify="center" style={{ marginBottom: 16 }}>
        <TextField
          type="search"
          variant="outlined"
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          placeholder="Search by Name, Description or Schedule"
          style={{ width: 500 }}
        />
      </Grid>
      {isLoading ? (
        <Loading>
          <CircularProgress />
        </Loading>
      ) : hasEstimates ? (
        <Grid container>
          <Table size="small">
            <StyledTableHead>
              <TableRow>
                <StyledTableHeadCell width={40} />
                <StyledTableHeadCell>Personnel</StyledTableHeadCell>
                <StyledTableHeadCell>Schedule</StyledTableHeadCell>
                <StyledTableHeadCell>Type</StyledTableHeadCell>
                <StyledTableHeadCell align="center">
                  Quantity
                </StyledTableHeadCell>
                <StyledTableHeadCell align="center">
                  Working Days
                </StyledTableHeadCell>
                <StyledTableHeadCell align="center">
                  Rate per Day
                </StyledTableHeadCell>
                <StyledTableHeadCell align="center">Amount</StyledTableHeadCell>
              </TableRow>
            </StyledTableHead>
            <TableBody>{renderItems()}</TableBody>
          </Table>
          <Grid container justify="flex-end" style={{ marginTop: 16 }}>
            <Pagination
              page={page}
              perPage={perPage}
              count={filteredEstimates.length}
              onChange={setPage}
            />
          </Grid>
        </Grid>
      ) : (
        <EmptyState>
          <WarningIcon style={{ color: '#95591E' }} fontSize="large" />
          No estimates found.
        </EmptyState>
      )}

      <Grid container justify="center" style={{ marginTop: 32 }}>
        <StyledButton
          variant="outlined"
          style={{ marginRight: 16 }}
          onClick={handleOnCancel}
        >
          Cancel
        </StyledButton>
        <StyledButton
          variant="contained"
          disabled={isLoading || !hasEstimates || isEmpty(selectedItems)}
          onClick={handleOnSubmit}
        >
          Add
        </StyledButton>
      </Grid>
    </Grid>
  );
}

SelectorModal.propTypes = {
  items: array,
  onChange: func,
  onCancel: func,

  estimates: array,
  schedules: array,
  fetchingEstimates: bool,
  fetchingSchedule: bool,
};

const mapStateToProps = state => {
  const {
    [NAMESPACE]: {
      costEstimates: { fetching: fetchingEstimates, estimates },
    },
    [SCHEDULE]: {
      schedule: { fetching: fetchingSchedule, data: schedules },
    },
  } = state;

  return {
    fetchingEstimates,
    estimates,
    fetchingSchedule,
    schedules,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectorModal);
