/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
/**
 *
 * Header
 *
 */

import React, { memo, useEffect, useState } from 'react';
import firebase from 'firebase/app';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Badge,
  Button,
  ButtonGroup,
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { useHistory } from 'react-router-dom';
import { fetchCompany } from 'containers/OrganizationPage/actions';
import { NAMESPACE as ORGANIZATION } from 'containers/OrganizationPage/constants';
import PrimetopLogo from '../../assets/logo.svg';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    width: 25,
  },
  companyGroup: {
    color: '#FFFFFF',
  },
  companyButton: {
    color: '#FFFFFF',
  },
}));

function Header(props) {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const { company, fetchCompany } = props;

  useEffect(() => {
    fetchCompany();
  }, []);

  const handleLogout = async () => {
    await firebase.auth().signOut();
    history.push('/');
  };

  const handleOpenMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOnClickProfile = () => {
    history.push('/profile');
  };

  const handleClickLogo = () => {
    if (firebase.auth().currentUser) {
      history.push('/projects');
    } else {
      history.push('/');
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleClickLogo}
        >
          <img
            className={classes.logo}
            src={PrimetopLogo}
            alt="primetop-logo"
          />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Primetop
        </Typography>
        <div>
          <ButtonGroup
            variant="text"
            size="small"
            className={classes.companyGroup}
          >
            <Button className={classes.companyButton}>
              {company.display_name}
            </Button>
            {company.code_number && (
              <Button className={classes.companyButton}>{`CODE NUMBER: ${
                company.code_number
              }`}</Button>
            )}
          </ButtonGroup>

          <IconButton
            color="inherit"
            onClick={() => {
              window.open('https://headwayapp.co/primetop-updates', '_blank');
            }}
          >
            <Badge badgeContent={1} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleOnClickProfile}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}

const mapStateToProps = state => {
  const {
    PROFILE: { profile },
    [ORGANIZATION]: { company },
  } = state;

  return {
    profile,
    company,
  };
};

const withConnect = connect(
  mapStateToProps,
  { fetchCompany },
);

export default compose(
  withConnect,
  memo,
)(Header);
