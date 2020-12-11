/**
 *
 * LandingPage
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useHistory } from 'react-router-dom';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import StarIcon from '@material-ui/icons/Star';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectLandingPage from './selectors';
import reducer from './reducer';
import saga from './saga';

import Logo from '../../assets/logo.png';
// import Allan from '../../assets/allandy.jpg';
import Allan from '../../assets/allandy.png';
import CostControlImg from '../../assets/cost-control.png';
import ScheduleImg from '../../assets/schedule.png';
import ReportsImg from '../../assets/reports.png';
import PurchaseOrderImg from '../../assets/purchase-order.png';
import FileMangementImg from '../../assets/file-management.png';
import ChatImg from '../../assets/chat.png';
import GMM from '../../assets/gmm.png';
import Alchedy from '../../assets/alchedy.png';
import PBA from '../../assets/pba.png';
import Ardhee from '../../assets/ardhee.png';
import Delta from '../../assets/delta.png';

import { useStyles } from './styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0F6A9F',
    },
  },
});

export function LandingPage() {
  useInjectReducer({ key: 'landingPage', reducer });
  useInjectSaga({ key: 'landingPage', saga });
  const classes = useStyles();
  const history = useHistory();

  const handleLogin = () => {
    history.push('/signin');
  };

  const handleGotoBlog = () => {
    window.location.href = 'https://blog.primetop.app';
  };

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <Grid
          container
          className={classes.appbar}
          justify="space-between"
          alignItems="center"
        >
          <Grid className={classes.brand}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <img className={classes.logo} src={Logo} alt="logo" />
            </IconButton>
            <Box className={classes.brandName}>
              <Typography variant="h6" className={classes.logoTitle}>
                Primetop
              </Typography>
              <Typography variant="p" className={classes.logoSubTitle}>
                Smart Construction Software
              </Typography>
            </Box>
          </Grid>
          <Grid item>
            <Button onClick={handleGotoBlog} color="primary">
              BLOG
            </Button>
            <Button onClick={handleLogin} variant="outlined" color="primary">
              LETS START
            </Button>
          </Grid>
        </Grid>

        <Grid container className={classes.main}>
          <Grid
            className={classes.headerCol}
            item
            md={12}
            xs={12}
            alignContent="center"
            alignItems="center"
          >
            <Typography variant="h6" className={classes.upperTitle}>
              Made by Contractor for Contractors
            </Typography>
            <Typography variant="h2" className={classes.mainTitle}>
              Manage Construction Projects Remotely
            </Typography>
            <Typography variant="h6" className={classes.mainSubTitle}>
              From Cost Efficient Planning To Real-time On Schedule Project
              Delivery.
            </Typography>
            <Grid className={classes.quotationHolder}>
              <List>
                <ListItem>
                  <Typography
                    className={`${classes.quotationText} ${
                      classes.quotationText
                    }`}
                  >
                    &#8220;The challenge of being a contractor lies under the
                    fact that there is no proper education to be one except
                    experience. Indeed, experience is a great teacher but are
                    you willing to burn money and lose a lot of time just to
                    gain experience unless there is a tool that can guide
                    you.&#8221;
                  </Typography>
                </ListItem>
                <ListItem>
                  <Box className={classes.quotationAuthor}>
                    <Avatar
                      className={classes.avatarAllan}
                      alt="Allan Dy"
                      src={Allan}
                    />
                    <Typography className={classes.quotationText}>
                      Engr. Allan Dy, CEO at Alchedy Construction Inc
                    </Typography>
                  </Box>
                </ListItem>
              </List>
            </Grid>
            <Button
              size="large"
              className={classes.demoButton}
              color="primary"
              variant="contained"
              disableElevation
              onClick={() => {
                history.push('/signin');
              }}
            >
              CREATE FREE ACCOUNT
            </Button>
            <Typography className={classes.quotationText}>
              20 companies signed up in the last week alone!
            </Typography>
          </Grid>
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
          >
            <Grid item className={classes.testimonialsHolder}>
              <Box>
                <StarIcon color="primary" />
                <StarIcon color="primary" />
                <StarIcon color="primary" />
                <StarIcon color="primary" />
                <StarIcon color="primary" />
              </Box>
              <Box>
                <Typography className={classes.testimonialsText}>
                  &#8220;perfect solution for sme contractors&#8221;
                </Typography>
                <Typography className={classes.quotationText}>
                  Engr. Clark Ferrer, Founder of Philippine Builders Association
                </Typography>
              </Box>
            </Grid>
            <Grid item className={classes.testimonialsHolder}>
              <Box>
                <StarIcon color="primary" />
                <StarIcon color="primary" />
                <StarIcon color="primary" />
                <StarIcon color="primary" />
                <StarIcon color="primary" />
              </Box>
              <Box>
                <Typography className={classes.testimonialsText}>
                  &#8220;Gives us clear auditing visibility for schedule and
                  budget constraints&#8221;
                </Typography>
                <Typography className={classes.quotationText}>
                  LP Tolentino, President of Ardhee Builders Inc.
                </Typography>
              </Box>
            </Grid>
            <Grid item className={classes.testimonialsHolder}>
              <Box>
                <StarIcon color="primary" />
                <StarIcon color="primary" />
                <StarIcon color="primary" />
                <StarIcon color="primary" />
                <StarIcon color="primary" />
              </Box>
              <Box>
                <Typography className={classes.testimonialsText}>
                  &#8220;No more delayed materials&#8221;
                </Typography>
                <Typography className={classes.quotationText}>
                  Arch. Mark Gil D. Mar, COO of GMM Builders Inc.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>

        <Grid container className={classes.graySection}>
          <Grid
            xs={12}
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Box mb={10}>
              <Typography
                variant="h4"
                className={`${classes.mainTitle} ${classes.textCenter}`}
              >
                Everything You Need In One Place
              </Typography>
              <Box mt={1}>
                <Typography variant="p">
                  All the features you need to save time, increase profit and
                  make a better decisions.
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Cost Control */}
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
            className={classes.featureItem}
          >
            <Grid item xs={12} md={2} />
            <Grid item xs={12} md={4}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <img
                  className={classes.illustrationImg}
                  src={CostControlImg}
                  alt="cost control"
                />
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Box mb={2}>
                  <Typography variant="h4" className={classes.mainTitle}>
                    Cost Control
                  </Typography>
                </Box>
                <Box mb={1}>
                  <Typography className={classes.textCenter}>
                    In order to quickly produce accurate construction <br />
                    estimates, you need to develop a unit-cost method for
                    <br />
                    estimating your construction projects.
                  </Typography>
                </Box>
                <Box mb={1}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleLogin}
                  >
                    START FREE 90-DAY TRIAL
                  </Button>
                </Box>
                <Typography className={classes.font8}>
                  No Credit Card Required
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} md={2} />
          </Grid>

          {/* Schedule */}
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
            className={`${classes.backgroundLightBlue} ${classes.featureItem}`}
          >
            <Grid item xs={12} md={2} />
            <Grid item xs={12} md={4}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Box mb={2}>
                  <Typography variant="h4" className={classes.mainTitle}>
                    Schedule Management
                  </Typography>
                </Box>
                <Box mb={1}>
                  <Typography className={classes.textCenter}>
                    List your activities, deliverables, and milestones within
                    <br /> a project. Plan your start and finish date, duration,
                    and <br /> resources assigned to each activity. estimating
                    your <br /> construction projects.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <img
                  className={classes.illustrationImg}
                  src={ScheduleImg}
                  alt="cost control"
                />
              </Grid>
            </Grid>
            <Grid item xs={12} md={2} />
          </Grid>

          {/* Generate Reports */}
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
            className={classes.featureItem}
          >
            <Grid item xs={12} md={2} />
            <Grid item xs={12} md={4}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <img
                  className={classes.illustrationImg}
                  src={ReportsImg}
                  alt="generate reports"
                />
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Box mb={2}>
                  <Typography variant="h4" className={classes.mainTitle}>
                    Generate Reports
                  </Typography>
                </Box>
                <Box mb={1}>
                  <Typography className={classes.textCenter}>
                    Track schedules, cost estimations, and generate
                    detail-driven operational reports. Easy data access for
                    auditing and downloadable in pdf and excel format.
                  </Typography>
                </Box>
                <Box mb={1}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleLogin}
                  >
                    START FREE 90-DAY TRIAL
                  </Button>
                </Box>
                <Typography className={classes.font8}>
                  No Credit Card Required
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} md={2} />
          </Grid>

          {/* Purchase Order */}
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
            className={`${classes.backgroundLightBlue} ${classes.featureItem}`}
          >
            <Grid item xs={12} md={2} />
            <Grid item xs={12} md={4}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Box mb={2}>
                  <Typography variant="h4" className={classes.mainTitle}>
                    Purchase Order
                  </Typography>
                </Box>
                <Box mb={1}>
                  <Typography className={classes.textCenter}>
                    Easily to create and organize your own purchasing document
                    that provides concrete instruction before sending your list
                    of material to supplier.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <img
                  className={classes.illustrationImg}
                  src={PurchaseOrderImg}
                  alt="generate reports"
                />
              </Grid>
            </Grid>
            <Grid item xs={12} md={2} />
          </Grid>

          {/* Generate Reports */}
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
            className={classes.featureItem}
          >
            <Grid item xs={12} md={2} />
            <Grid item xs={12} md={4}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <img
                  className={classes.illustrationImg}
                  src={FileMangementImg}
                  alt="file management"
                />
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Box mb={2}>
                  <Typography variant="h4" className={classes.mainTitle}>
                    File Management
                  </Typography>
                </Box>
                <Box mb={1}>
                  <Typography className={classes.textCenter}>
                    Upload your centralized document per project. Contracts,
                    compliance documentation, drawings and specs that ensure a
                    project is carried out according to plan.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={12} md={2} />
          </Grid>

          {/* Track Conversations */}
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
            className={`${classes.backgroundLightBlue}`}
          >
            <Grid item xs={12} md={2} />
            <Grid item xs={12} md={4}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Box mb={2}>
                  <Typography variant="h4" className={classes.mainTitle}>
                    Track Conversation
                  </Typography>
                </Box>
                <Box mb={1}>
                  <Typography className={classes.textCenter}>
                    Everything gets lost in an endless threads and <br />
                    channels keep the communication about the project in
                    <br />a single place.
                  </Typography>
                </Box>
                <Box mb={1}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleLogin}
                  >
                    START FREE 90-DAY TRIAL
                  </Button>
                </Box>
                <Typography className={classes.font8}>
                  No Credit Card Required
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <img
                  className={classes.illustrationImg}
                  src={ChatImg}
                  alt="chat"
                />
              </Grid>
            </Grid>
            <Grid item xs={12} md={2} />
          </Grid>
        </Grid>

        <Grid
          xs={12}
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Box mb={5} mt={5}>
            <Typography
              variant="h4"
              className={`${classes.mainTitle} ${classes.textCenter}`}
            >
              You&apos;re in Good Company
            </Typography>
          </Box>
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
            className={classes.companiesHolder}
          >
            <Grid item>
              <img className={classes.companyLogo} src={GMM} alt="gmm" />
            </Grid>
            <Grid item>
              <img
                className={classes.companyLogo}
                src={Alchedy}
                alt="alchedy"
              />
            </Grid>
            <Grid item>
              <img className={classes.companyLogo} src={PBA} alt="pba" />
            </Grid>
            <Grid item>
              <img className={classes.companyLogo} src={Delta} alt="delta" />
            </Grid>
            <Grid item>
              <img className={classes.companyLogo} src={Ardhee} alt="ardhee" />
            </Grid>
          </Grid>
        </Grid>

        <Grid container justify="center" className={classes.footerSection}>
          <Typography variant="p" className={classes.footerText}>
            Copyright Primetop 2020
          </Typography>
        </Grid>
      </div>
    </MuiThemeProvider>
  );
}

LandingPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  landingPage: makeSelectLandingPage(),
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

export default compose(withConnect)(LandingPage);
