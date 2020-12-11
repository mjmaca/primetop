/* eslint-disable no-shadow */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid } from '@material-ui/core';
import Email from '@material-ui/icons/Email';
import { func } from 'prop-types';

import { sendPasswordResetEmail, setMode } from '../../actions';
import { MODE } from '../../constants';
import {
  BoxWrapper,
  Box,
  Title,
  Description,
  FormInput,
  StyledTextField,
  StyledButton,
  StyledBackButton,
  StyledAnchor,
} from '../../styles';

import { ContactSupport, ErrorMessage } from './styles';

function ForgotPassword(props) {
  const { sendPasswordResetEmail, setMode } = props;
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');

  const handleOnClickResetPassword = async () => {
    try {
      await sendPasswordResetEmail(email);
      setMode(MODE.SIGN_IN);
    } catch ({ message }) {
      setError(message);
    }
  };

  return (
    <BoxWrapper container>
      <Box>
        <Title container>Forgot your password?</Title>
        <Description>
          We&apos;ll help you reset it and get back on track
        </Description>
        <Grid container>
          <FormInput container alignItems="flex-end">
            <Email style={{ color: '#084B8A', width: 16 }} />
            <StyledTextField
              label="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </FormInput>
          <ErrorMessage>{error}</ErrorMessage>
        </Grid>
        <Grid container>
          <ContactSupport>
            Can&apos;t remember your email?&nbsp;
            <StyledAnchor>Contact Support</StyledAnchor>
          </ContactSupport>
        </Grid>
        <Grid container justify="center" style={{ marginTop: 16 }}>
          <StyledButton
            variant="contained"
            onClick={handleOnClickResetPassword}
          >
            Reset Password
          </StyledButton>
        </Grid>
        <Grid container justify="center">
          <StyledBackButton onClick={() => setMode(MODE.SIGN_IN)}>
            Back
          </StyledBackButton>
        </Grid>
      </Box>
    </BoxWrapper>
  );
}

ForgotPassword.propTypes = {
  sendPasswordResetEmail: func,
  setMode: func,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      sendPasswordResetEmail,
      setMode,
    },
    dispatch,
  );

export default connect(
  null,
  mapDispatchToProps,
)(ForgotPassword);
