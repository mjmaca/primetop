import React from 'react';

import { Grid } from '@material-ui/core';

import { StyledButton } from '../../styles';
import { Background, Smoke, Text } from './styles';

function Upgrade() {
  return (
    <Background>
      <Smoke>
        <Text style={{ fontSize: 12 }}>Primetop Enterprise Edition</Text>
        <Text style={{ fontSize: 24, marginTop: 16, fontWeight: 500 }}>
          Construction made Easy
        </Text>
        <Text style={{ fontSize: 10, marginTop: 16, width: 200 }}>
          Unlimited features, create multiple projects, unlimited team members
        </Text>
        <Grid container justify="center" style={{ marginTop: 24 }}>
          <StyledButton variant="contained">Upgrade Now</StyledButton>
        </Grid>
      </Smoke>
    </Background>
  );
}

export default Upgrade;
