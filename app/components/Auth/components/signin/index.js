/* eslint-disable no-shadow */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Typography, TextField, Button } from '@material-ui/core';
import Email from '@material-ui/icons/Email';
import Lock from '@material-ui/icons/Lock';
import { useHistory } from 'react-router-dom';
import { func } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import { signInWithEmailAndPassword, setMode } from '../../actions';
import { MODE } from '../../constants';
import {
  BoxWrapper,
  Box,
  Error,
  StyledAnchor,
  TopRightTeaser,
} from '../../styles';

const useStyles = makeStyles({
  input: {
    width: 'calc(100% - 40px)',
  },
  button: {
    backgroundColor: '#BF0E08',
    color: '#FFFFFF',
  },
  title: {
    fontFamily: 'Jost',
  },
  buttonHolder: {
    marginTop: 24,
    marginBottom: 24,
  },
  forgotPassword: {
    marginTop: 16,
  },
});

function SignIn(props) {
  const classes = useStyles();
  const { signInWithEmailAndPassword, setMode } = props;
  const history = useHistory();
  const [error, setError] = useState('');
  // const [remember, setRemember] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleOnClickSignIn = async () => {
    try {
      await signInWithEmailAndPassword({ email, password });
      history.push('/projects');
    } catch ({ message }) {
      setError(message);
    }
  };

  return (
    <BoxWrapper container>
      <TopRightTeaser>
        Don&apos;t have any account?{' '}
        <StyledAnchor component="button" onClick={() => setMode(MODE.SIGN_UP)}>
          Create Account
        </StyledAnchor>
      </TopRightTeaser>
      <Box>
        <Typography variant="h4" className={classes.title}>
          Sign in to Primetop
        </Typography>
        <Error>{error}</Error>
        <Grid container>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <Email style={{ color: '#084B8A' }} />
            </Grid>
            <Grid item className={classes.input}>
              <TextField
                label="Email"
                fullWidth
                onChange={e => setEmail(e.target.value)}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid container>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <Lock style={{ color: '#084B8A' }} />
            </Grid>
            <Grid item className={classes.input}>
              <TextField
                type="password"
                label="Password"
                fullWidth
                onChange={e => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12}>
            <Grid
              container
              justify="flex-end"
              className={classes.forgotPassword}
            >
              <StyledAnchor
                component="button"
                onClick={() => setMode(MODE.FORGOT_PASSWORD)}
                style={{ color: '#1070CA' }}
              >
                Forgot Password?
              </StyledAnchor>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          justify="center"
          direction="column"
          className={classes.buttonHolder}
        >
          <Button
            className={classes.button}
            variant="contained"
            onClick={handleOnClickSignIn}
          >
            Sign In
          </Button>
          <Button
            onClick={() => {
              setMode(MODE.SIGN_UP);
            }}
          >
            I want to create an account
          </Button>
        </Grid>
      </Box>
    </BoxWrapper>
  );
}

SignIn.propTypes = {
  signInWithEmailAndPassword: func,
  setMode: func,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      signInWithEmailAndPassword,
      setMode,
    },
    dispatch,
  );

export default connect(
  null,
  mapDispatchToProps,
)(SignIn);
