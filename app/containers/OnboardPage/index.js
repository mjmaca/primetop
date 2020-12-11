/**
 *
 * Onboard
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import OnboardForm from 'components/OnboardForm';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectOnboard from './selectors';
import reducer from './reducer';
import saga from './saga';

export function OnboardPage() {
  useInjectReducer({ key: 'onboard', reducer });
  useInjectSaga({ key: 'onboard', saga });

  return (
    <Grid>
      <OnboardForm />
    </Grid>
  );
}

OnboardPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  onboard: makeSelectOnboard(),
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

export default compose(withConnect)(OnboardPage);
