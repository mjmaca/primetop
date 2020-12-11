/* eslint-disable no-shadow */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useHistory } from 'react-router-dom';
import { Grid, Typography, TextField, Button } from '@material-ui/core';
import Email from '@material-ui/icons/Email';
import Lock from '@material-ui/icons/Lock';
import { func } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  createUserWithEmailAndPassword,
  setMode,
  signInWithEmailAndPassword,
} from '../../actions';
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
});

function SignUp(props) {
  const classes = useStyles();
  const history = useHistory();
  const {
    createUserWithEmailAndPassword,
    setMode,
    signInWithEmailAndPassword,
  } = props;
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleOnClickSignUp = async () => {
    try {
      if (password === confirmPassword) {
        await createUserWithEmailAndPassword({ email, password });
        await signInWithEmailAndPassword({ email, password });
        history.push('/verify');
      } else {
        setError('Ooops looks like your password did not match');
      }
    } catch ({ message }) {
      setError(message);
    }
  };

  return (
    <BoxWrapper container>
      <TopRightTeaser>
        Already have an account?{' '}
        <StyledAnchor component="button" onClick={() => setMode(MODE.SIGN_IN)}>
          Sign In
        </StyledAnchor>
      </TopRightTeaser>
      <Box>
        <Typography variant="h4" className={classes.title}>
          Get started absolutely free
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
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <Lock style={{ color: '#084B8A' }} />
            </Grid>
            <Grid item className={classes.input}>
              <TextField
                type="password"
                label="Confirm Password"
                fullWidth
                onChange={e => setConfirmPassword(e.target.value)}
              />
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
            variant="contained"
            className={classes.button}
            onClick={handleOnClickSignUp}
          >
            Create Account
          </Button>
          <Button
            onClick={() => {
              setMode(MODE.SIGN_IN);
            }}
          >
            I Already have an account.
          </Button>
        </Grid>
      </Box>
    </BoxWrapper>
  );
}

SignUp.propTypes = {
  createUserWithEmailAndPassword: func,
  signInWithEmailAndPassword: func,
  setMode: func,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createUserWithEmailAndPassword,
      signInWithEmailAndPassword,
      setMode,
    },
    dispatch,
  );

export default connect(
  null,
  mapDispatchToProps,
)(SignUp);
