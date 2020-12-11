/* eslint-disable dot-notation */
/* eslint-disable arrow-body-style */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { array, func, bool, object } from 'prop-types';
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
    hiddenFields,
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
      const selectedItem = {
        ...item,
        // add price_per_unit to actual price to give user the estimated price
        actual_price_per_unit: item.price_per_unit,
        discount: 0,
      };

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

    estimates.forEach(({ material_cost, equipment_cost, schedule_id }) => {
      const schedule = schedules.find(({ id }) => id === schedule_id) || {};
      const item_estimate = [
        ...material_cost,
        ...equipment_cost.filter(
          ({ acquisition_type }) => acquisition_type === 'buy',
        ),
      ];

      items = [
        ...items,
        ...item_estimate.map(item => {
          // eslint-disable-next-line no-param-reassign
          item.schedule = schedule;
          return item;
        }),
      ];
    });

    return items.filter(item => {
      const { name, description, schedule = {} } = item;

      if (keyword) {
        return `${name} ${description} ${schedule.text}`
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
          name,
          description,
          schedule,
          quantity,
          unit,
          price_per_unit,
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
            {!hiddenFields['name'] && <TableCell>{name}</TableCell>}
            {!hiddenFields['description'] && (
              <TableCell>{description}</TableCell>
            )}
            {!hiddenFields['schedule'] && (
              <TableCell>{schedule.text}</TableCell>
            )}
            {!hiddenFields['quantity'] && (
              <TableCell align="center">
                {quantity} {unit}
              </TableCell>
            )}
            {!hiddenFields['price_per_unit'] && (
              <TableCell align="center">
                ₱ {price_per_unit.toLocaleString()}
              </TableCell>
            )}
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
                {!hiddenFields['name'] && (
                  <StyledTableHeadCell>Item Name</StyledTableHeadCell>
                )}
                {!hiddenFields['description'] && (
                  <StyledTableHeadCell>Description</StyledTableHeadCell>
                )}
                {!hiddenFields['schedule'] && (
                  <StyledTableHeadCell>Schedule</StyledTableHeadCell>
                )}
                {!hiddenFields['quantity'] && (
                  <StyledTableHeadCell align="center">
                    Quantity
                  </StyledTableHeadCell>
                )}
                {!hiddenFields['price_per_unit'] && (
                  <StyledTableHeadCell align="center">
                    Estimated Price
                  </StyledTableHeadCell>
                )}
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
  hiddenFields: object,
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
