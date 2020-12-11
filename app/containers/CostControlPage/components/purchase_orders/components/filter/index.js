/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { object, func } from 'prop-types';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { NAMESPACE } from '../../../../constants';
import { setFilter } from '../../../../actions';

function Filter(props) {
  const { filter, setFilter } = props;
  const { date, keyword } = filter;

  /** reset filter on component will unmount */
  useEffect(
    () => () => {
      setFilter('keyword', '');
      setFilter('date', null);
    },
    [],
  );

  return (
    <Grid container alignItems="center">
      <Grid item style={{ marginRight: 32 }}>
        <TextField
          type="search"
          variant="outlined"
          value={keyword}
          onChange={e => setFilter('keyword', e.target.value)}
          placeholder="PO Number"
        />
      </Grid>
      <Grid item>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              label="Search by Date"
              value={date}
              onChange={e => setFilter('date', e)}
            />
          </Grid>
        </MuiPickersUtilsProvider>
      </Grid>
    </Grid>
  );
}

Filter.propTypes = {
  filter: object,
  setFilter: func,
};

const mapStateToProps = state => {
  const {
    [NAMESPACE]: { filter },
  } = state;

  return {
    filter,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ setFilter }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Filter);
