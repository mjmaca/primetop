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
  fetchReceivedMaterials,
  resetReceivedMaterial,
} from 'containers/CostControlPage/actions';

import Listing from './components/listing';
import Filter from './components/filter';
import Form from './components/form';

function ReceivedMaterials(props) {
  const { projectId } = useParams();
  const {
    fetching,
    mode,
    setMode,
    fetchReceivedMaterials,
    resetReceivedMaterial,
    permission,
  } = props;

  useEffect(() => {
    setMode('list');
    fetchReceivedMaterials(projectId);
  }, []);

  const handleOnCreateReceivedMaterial = () => {
    resetReceivedMaterial();
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
              <h4>Materials &amp; Equipment</h4>
            </Grid>
            <Grid item xs={6} style={{ textAlign: 'right' }}>
              {permission.add && (
                <StyledButton
                  variant="contained"
                  onClick={handleOnCreateReceivedMaterial}
                >
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

ReceivedMaterials.propTypes = {
  fetching: bool,
  mode: string,
  setMode: func,
  resetReceivedMaterial: func,
  fetchReceivedMaterials: func,
  permission: object,
};

const mapStateToProps = state => {
  const {
    [NAMESPACE]: {
      mode,
      receivedMaterials: { fetching },
    },
  } = state;

  return {
    fetching,
    mode,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { setPage, setMode, fetchReceivedMaterials, resetReceivedMaterial },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReceivedMaterials);
