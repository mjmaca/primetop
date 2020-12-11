/* eslint-disable react/prop-types */
/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase/app';
import Auth from 'components/Auth';

import { NAMESPACE as APP } from '../App/constants';

function AuthPage(props) {
  const history = useHistory();
  const { fetching } = props;
  const { currentUser } = firebase.auth();

  useEffect(() => {
    if (currentUser && currentUser.emailVerified) {
      history.push('/projects');
    }
  }, []);

  return (
    <Grid
      display="flex"
      alignItems="center"
      justifyContent="center"
      border="none"
    >
      {fetching ? 'Loading...' : <Auth />}
    </Grid>
  );
}

const mapStateToProps = state => {
  const {
    [APP]: { fetching },
  } = state;

  return { fetching };
};

export default connect(
  mapStateToProps,
  null,
)(AuthPage);
