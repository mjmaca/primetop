/**
 *
 * Auth
 *
 */

import React, { memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { bool, string } from 'prop-types';
import { Grid, LinearProgress } from '@material-ui/core';

import SignIn from './components/signin';
import SignUp from './components/signup';
import ForgotPassword from './components/forgot_password';
import Upgrade from './components/upgrade';

import { NAMESPACE, MODE } from './constants';

function Auth(props) {
  const { loading, mode } = props;

  return (
    <Grid container>
      <Grid container style={{ position: 'fixed' }}>
        {loading && <LinearProgress style={{ width: '100%' }} />}
      </Grid>
      <Grid container style={{ height: '100vh' }}>
        <Grid item xs={4}>
          <Upgrade />
        </Grid>
        <Grid item xs={8}>
          {mode === MODE.SIGN_IN && <SignIn />}
          {mode === MODE.SIGN_UP && <SignUp />}
          {mode === MODE.FORGOT_PASSWORD && <ForgotPassword />}
        </Grid>
      </Grid>
    </Grid>
  );
}

Auth.propTypes = {
  loading: bool,
  mode: string,
};

const mapStateToProps = state => {
  const {
    [NAMESPACE]: { loading, mode },
  } = state;

  return {
    loading,
    mode,
  };
};

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(
  withConnect,
  memo,
)(Auth);
