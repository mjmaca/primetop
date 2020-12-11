/**
 *
 * SupplierListPage
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import SupplierList from 'components/SupplierList';
import Sidebar from 'components/Sidebar';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectSupplierListPage from './selectors';
import reducer from './reducer';
import saga from './saga';


export function SupplierListPage() {
  useInjectReducer({ key: 'supplierListPage', reducer });
  useInjectSaga({ key: 'supplierListPage', saga });

  return (
    <Grid container style={{ height: '100vh' }}>
      <Grid item xs={2}>
        <Sidebar />
      </Grid>
      <Grid item xs={10} style={{ flexGrow: 1, padding: 16 }}>
        <Paper>
          <Grid container direction="column">
            <Grid md={12} item>
              <SupplierList />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

SupplierListPage.propTypes = {
  // dispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  supplierListPage: makeSelectSupplierListPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(SupplierListPage);
