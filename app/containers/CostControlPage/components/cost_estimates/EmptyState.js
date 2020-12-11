import React from 'react';
import Grid from '@material-ui/core/Grid';

function EmptyState() {
  return (
    <Grid container justify="center" alignItems="center" style={{ height: 80 }}>
      <Grid item>Start Adding Estimates!</Grid>
    </Grid>
  );
}

export default EmptyState;
