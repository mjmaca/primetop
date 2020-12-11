/**
 *
 * ProAccountWelcome
 *
 */

import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import LockIcon from '@material-ui/icons/Lock';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  emptyTitle: {
    textAlign: 'center',
  },
  emptyContainer: {
    flexWrap: 'nowrap',
    height: '100%',
    padding: `40px 0px`,
  },
  feature: {
    width: 400,
    margin: 16,
    textAlign: 'center',
  },
  trialButton: {
    padding: '6px 16px',
    backgroundColor: '#F50057',
    color: '#FFFFFF',
    fontSize: 20,
    borderRadius: 4,
    textDecoration: 'none',
  },
});

function ProAccountWelcome() {
  const classes = useStyles();

  return (
    <Grid
      className={classes.emptyContainer}
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Grid item>
        <Typography variant="h3" gutterBottom>
          Upgrade to Premium Account!
        </Typography>
      </Grid>
      <Grid item>
        <Paper className={classes.feature}>
          <Box p={2}>
            <Typography variant="h5" gutterBottom>
              <LockIcon color="secondary" fontSize="large" /> User Roles
              Management
            </Typography>
            <Typography className={classes.emptyTitle} gutterBottom>
              Secure your business by hiding sensitive information and provide
              the right access for everyone.
            </Typography>
          </Box>
        </Paper>
        <Paper className={classes.feature}>
          <Box p={2}>
            <Typography variant="h5" gutterBottom>
              <TrendingUpIcon color="secondary" fontSize="large" /> Project
              Reports
            </Typography>
            <Typography className={classes.emptyTitle} gutterBottom>
              Create a better decision by easily looking at the chart and status
              of the project, very helpful for contractors.
            </Typography>
          </Box>
        </Paper>
      </Grid>
      <Box mt={2}>
        <a
          target="_blank"
          href="https://forms.gle/yrq38jteAaV8ZuRF6"
          className={classes.trialButton}
        >
          FREE 1 MONTH TRIAL
        </a>
      </Box>
    </Grid>
  );
}

ProAccountWelcome.propTypes = {};

export default ProAccountWelcome;
