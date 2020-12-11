/* eslint-disable camelcase */
/* eslint-disable no-shadow */
import 'date-fns';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { func, bool, string } from 'prop-types';
import { useParams } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import { StyledButton, Loading } from 'containers/CostControlPage/styles';
import { NAMESPACE } from 'containers/CostControlPage/constants';
import {
  setPage,
  setMode,
  fetchRequestMaterials,
  resetRequestMaterial,
} from 'containers/CostControlPage/actions';

import { Legends, Legend, warning, success } from './styles';

import Listing from './components/listing';
import Filter from './components/filter';
import Form from './components/form';

function RequestMaterials(props) {
  const { projectId } = useParams();
  const {
    fetching,
    mode,
    setMode,
    fetchRequestMaterials,
    resetRequestMaterial,
  } = props;

  useEffect(() => {
    setMode('list');
    fetchRequestMaterials(projectId);
  }, []);

  const handleOnCreateRequestMaterial = () => {
    resetRequestMaterial();
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
              <h4>Request Materials</h4>
            </Grid>
            <Grid item xs={6} style={{ textAlign: 'right' }}>
              <StyledButton
                variant="contained"
                onClick={handleOnCreateRequestMaterial}
              >
                Create New
              </StyledButton>
            </Grid>
          </Grid>

          {/* Filter Component */}
          <Filter />
          {/* Legend */}
          <Legends container>
            <Legend color={warning} style={{ marginRight: 8 }}>
              Wait for Approval
            </Legend>
            <Legend color={success}>Approved</Legend>
          </Legends>

          {/* Listing Component */}
          <Listing />
        </Grid>
      )}
    </>
  );
}

RequestMaterials.propTypes = {
  fetching: bool,
  mode: string,
  setMode: func,
  resetRequestMaterial: func,
  fetchRequestMaterials: func,
};

const mapStateToProps = state => {
  const {
    [NAMESPACE]: {
      mode,
      requestMaterials: { fetching },
    },
  } = state;

  return {
    fetching,
    mode,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { setPage, setMode, fetchRequestMaterials, resetRequestMaterial },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RequestMaterials);
