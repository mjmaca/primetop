/* eslint-disable camelcase */
/* eslint-disable no-shadow */
import 'date-fns';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { func, bool, string, object } from 'prop-types';
import { useParams } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import { StyledButton, Loading } from 'containers/CostControlPage/styles';
import { NAMESPACE } from 'containers/CostControlPage/constants';
import {
  setPage,
  setMode,
  fetchLabors,
  resetLabor,
} from 'containers/CostControlPage/actions';

import Listing from './components/listing';
import Filter from './components/filter';
import Form from './components/form';

function Labors(props) {
  const { projectId } = useParams();
  const {
    fetching,
    mode,
    setMode,
    fetchLabors,
    resetLabor,
    permission,
  } = props;

  useEffect(() => {
    setMode('list');
    fetchLabors(projectId);
  }, []);

  const handleOnCreateLabor = () => {
    resetLabor();
    setMode('add');
  };

  if (['view', 'add', 'edit'].includes(mode)) {
    return <Form />;
  }

  return (
    <>
      {fetching ? (
        <Loading style={{ height: '100%' }}>
          <CircularProgress />
        </Loading>
      ) : (
        <Grid container style={{ height: '100%', flexFlow: 'column' }}>
          {/* Heading */}
          <Grid container>
            <Grid item xs={6}>
              <h4>Labor</h4>
            </Grid>
            <Grid item xs={6} style={{ textAlign: 'right' }}>
              {permission.add && (
                <StyledButton variant="contained" onClick={handleOnCreateLabor}>
                  Create New
                </StyledButton>
              )}
            </Grid>
          </Grid>

          {/* Filter Component */}
          <Filter />

          {/* Listing Component */}
          <Listing permission={permission} />
        </Grid>
      )}
    </>
  );
}

Labors.propTypes = {
  fetching: bool,
  mode: string,
  setMode: func,
  resetLabor: func,
  fetchLabors: func,
  permission: object,
};

const mapStateToProps = state => {
  const {
    [NAMESPACE]: { mode },
  } = state;

  return {
    fetching: false,
    mode,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ setPage, setMode, fetchLabors, resetLabor }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Labors);
