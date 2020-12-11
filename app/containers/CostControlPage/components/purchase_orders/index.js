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
  fetchPurchaseOrders,
  resetPurchaseOrder,
} from 'containers/CostControlPage/actions';

import { Legends, Legend, warning, success } from './styles';

import Listing from './components/listing';
import Filter from './components/filter';
import Form from './components/form';

function PurchaseOrder(props) {
  const { projectId } = useParams();
  const {
    fetching,
    mode,
    setMode,
    fetchPurchaseOrders,
    resetPurchaseOrder,
    permission,
  } = props;

  useEffect(() => {
    setMode('list');
    fetchPurchaseOrders(projectId);
  }, []);

  const handleOnCreatePO = () => {
    resetPurchaseOrder();
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
              <h4>Purchase Order</h4>
            </Grid>
            <Grid item xs={6} style={{ textAlign: 'right' }}>
              {permission.add && (
                <StyledButton variant="contained" onClick={handleOnCreatePO}>
                  Create PO
                </StyledButton>
              )}
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
          <Listing permission={permission} />
        </Grid>
      )}
    </>
  );
}

PurchaseOrder.propTypes = {
  fetching: bool,
  mode: string,
  fetchPurchaseOrders: func,
  setMode: func,
  resetPurchaseOrder: func,
  permission: object,
};

const mapStateToProps = state => {
  const {
    [NAMESPACE]: {
      filter,
      mode,
      purchaseOrders: { fetching },
    },
  } = state;

  return {
    fetching,
    filter,
    mode,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { setPage, setMode, fetchPurchaseOrders, resetPurchaseOrder },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PurchaseOrder);
