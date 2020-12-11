/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
/* eslint-disable no-shadow */
/**
 *
 * OrganizationPage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { func, object, bool, node, any } from 'prop-types';
import { isEmpty } from 'lodash';

import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import AccessMatrix from 'components/AccessMatrix';
import Sidebar from 'components/Sidebar';

import { fetchCompany, fetchCompanyMembers, updateUser } from './actions';
import { NAMESPACE } from './constants';

import Members from './components/members';
import Company from './components/company';

import { StyledOrganization, Loading, CodeNumber } from './styles';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export function OrganizationPage(props) {
  const {
    fetchCompany,
    fetchCompanyMembers,
    company,
    fetching,
    updateUser,
  } = props;
  const [tab, setTab] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchData = async () => {
    const { members } = await fetchCompany();
    !isEmpty(members) &&
      fetchCompanyMembers(members.map(({ user }) => user.split('users/')[1]));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Grid
      container
      style={{ minHeight: '100vh', height: '100%', flexWrap: 'nowrap' }}
      justify="center"
    >
      <Grid item style={{ flex: 'none' }}>
        <Sidebar />
      </Grid>

      <Grid item style={{ width: '100%', backgroundColor: '#ddd' }}>
        <Grid
          container
          justify="center"
          style={{ backgroundColor: '#fff', marginLeft: -1, height: '100%' }}
        >
          {fetching ? (
            <Loading>
              <CircularProgress />
              Please wait...
            </Loading>
          ) : (
            <StyledOrganization>
              <Grid>
                <Box mb={5}>
                  <Typography variant="h4" component="h4">
                    Welcome To Your Company Details!
                  </Typography>
                  <Typography component="p">
                    First thing you will need is an organization, Does your
                    organization already have a Primetop account?
                  </Typography>
                  <Typography component="p">
                    Ask them to signup and use your company code:{' '}
                    <CodeNumber>{company.code_number}</CodeNumber>
                  </Typography>
                </Box>
              </Grid>
              <Tabs
                value={tab}
                onChange={handleChange}
                aria-label="simple tabs example"
              >
                <Tab label="Company" {...a11yProps(0)} />
                <Tab label="Members" {...a11yProps(1)} />
                <Tab label="User Access" {...a11yProps(2)} />
              </Tabs>
              <Divider />

              <TabPanel value={tab} index={0}>
                <Company />
              </TabPanel>
              <TabPanel value={tab} index={1}>
                <Members
                  isUpdating={isUpdating}
                  setIsUpdating={setIsUpdating}
                  updateUser={updateUser}
                  fetchData={fetchData}
                />
              </TabPanel>
              <TabPanel value={tab} index={2}>
                <AccessMatrix />
              </TabPanel>
            </StyledOrganization>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

TabPanel.propTypes = {
  children: node,
  index: any,
  value: any,
};

OrganizationPage.propTypes = {
  fetchCompany: func,
  fetchCompanyMembers: func,
  updateUser: func,
  company: object,
  fetching: bool,
};

const mapStateToProps = state => {
  const {
    [NAMESPACE]: { company, fetching },
  } = state;

  return {
    company,
    fetching,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { fetchCompany, fetchCompanyMembers, updateUser },
    dispatch,
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(OrganizationPage);
