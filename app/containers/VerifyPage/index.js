/**
 *
 * VerifyPage
 *
 */

import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase/app';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectVerifyPage from './selectors';
import reducer from './reducer';
import saga from './saga';

const useStyles = makeStyles(() => ({
  root: {
    height: 'calc(100vh - 74px)',
  },
}));

export function VerifyPage() {
  useInjectReducer({ key: 'verifyPage', reducer });
  useInjectSaga({ key: 'verifyPage', saga });
  const { currentUser } = firebase.auth();
  const classes = useStyles();
  const history = useHistory();
  // const isVerified = currentUser.emailVerified;
  const isVerified = true;

  useEffect(() => {
    if (isVerified) {
      firebase
        .firestore()
        .collection('users')
        .doc(currentUser.uid)
        .get()
        .then(results => {
          if (results.exists) {
            const doc = results.data();
            const isOnboard = doc.is_onboard;
            if (isOnboard) {
              history.push('/projects');
            } else {
              history.push('/onboard');
            }
          } else {
            history.push('/onboard');
          }
        });
    }
  }, []);

  return (
    <Grid
      className={classes.root}
      container
      justify="center"
      alignContent="center"
      direction="column"
      alignItems="center"
    >
      <Typography variant="h4">
        You need to verify your account first!
      </Typography>
      {!isVerified && (
        <React.Fragment>
          <Typography component="h2">
            We also sent you an email, please click the link to verify your
            account.
          </Typography>
          <Typography component="h2">
            If page did not update, please refresh the page to continue.
          </Typography>
        </React.Fragment>
      )}
    </Grid>
  );
}

VerifyPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  verifyPage: makeSelectVerifyPage(),
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

export default compose(withConnect)(VerifyPage);
