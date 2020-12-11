/* eslint-disable arrow-body-style */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable camelcase */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-shadow */
/**
 *
 * CostControl
 *
 */

import React, { memo, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { func, bool, object, number } from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';
import { isEmpty } from 'lodash';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Sidebar from 'components/Sidebar';
import ScheduleTree from 'components/ScheduleTree';

import {
  fetchSchedule,
  setDefaultActiveChild,
  resetSelectedSchedule,
} from 'containers/SchedulePage/actions';
import { fetchProject } from 'containers/ProjectPage/actions';
import { fetchEstimates } from 'containers/CostControlPage/actions';

import { NAMESPACE as SCHEDULE } from 'containers/SchedulePage/constants';
import { NAMESPACE as PROJECT } from 'containers/ProjectPage/constants';
import { NAMESPACE as ORGANIZATION } from 'containers/OrganizationPage/constants';

import { NAMESPACE } from './constants';
import {
  Loading,
  Tabs,
  Tab,
  StyledTabButton,
  WelcomeWrapper,
  WelcomeMessage,
} from './styles';

import CostEstimates from './components/cost_estimates';
import CostEstimatesPDF from './components/cost_estimates/components/pdf';
import PurchaseOrders from './components/purchase_orders';
import RequestMaterials from './components/request_materials';
import ReceivedMaterials from './components/received_materials';
import Labors from './components/labors';

import getPermission from '../../helpers/userRoles';

export function CostControl(props) {
  const history = useHistory();
  const { projectId } = useParams();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const {
    fetchSchedule,
    fetchProject,
    fetchEstimates,
    setDefaultActiveChild,
    fetchingSchedule,
    selectedSchedule,
    resetSelectedSchedule,
    totalEstimates,
    profile,
  } = props;

  const cePermission = getPermission(profile.position, 'cost_estimates');
  const poPermission = getPermission(profile.position, 'purchase_order');
  const omPermission = getPermission(profile.position, 'onboarding_materials');
  const lPermission = getPermission(profile.position, 'labors');
  const {
    location: { hash },
  } = history;

  const fetchData = async () => {
    await resetSelectedSchedule();
    await fetchSchedule(projectId);
    /** set default active child and set default selected schedule */
    setDefaultActiveChild();

    await fetchEstimates(projectId);
  };

  useEffect(() => {
    fetchProject(projectId);
    fetchData();
  }, []);

  const handleTabChange = tab => {
    history.push(`/cost_control/${projectId}${tab}`);
    setAnchorEl(null);
  };

  const handleOpenMenu = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleOnDownloadCE = () => {
    CostEstimatesPDF({ ...props });
  };

  return (
    <Grid
      container
      style={{ minHeight: '100vh', height: '100%', flexWrap: 'nowrap' }}
    >
      <Grid item style={{ flex: 'none' }}>
        <Sidebar />
      </Grid>

      <Menu
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        style={{ marginTop: 4 }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => handleTabChange('#received')}>
          Received Order
        </MenuItem>
        <MenuItem onClick={() => handleTabChange('#labors')}>
          Add Labor
        </MenuItem>
      </Menu>

      {fetchingSchedule ? (
        <Loading>
          <CircularProgress style={{ color: '#3f51b5' }} />
          Please wait...
        </Loading>
      ) : (
        <Grid item style={{ width: '100%', backgroundColor: '#ddd' }}>
          <Grid container style={{ backgroundColor: '#fff', marginLeft: -1 }}>
            <Tabs>
              {cePermission.view && (
                <Tab isActive={hash === '#cost_estimates'}>
                  <StyledTabButton
                    onClick={() => handleTabChange('#cost_estimates')}
                  >
                    Cost Estimation
                  </StyledTabButton>
                </Tab>
              )}
              {poPermission.view && (
                <Tab isActive={hash === '#purchase_orders'}>
                  <StyledTabButton
                    onClick={() => handleTabChange('#purchase_orders')}
                  >
                    Purchase Order
                  </StyledTabButton>
                </Tab>
              )}
              <Tab isActive={hash === '#requests'}>
                <StyledTabButton onClick={() => handleTabChange('#requests')}>
                  Request Order
                </StyledTabButton>
              </Tab>
              <Tab isActive={['#received', '#labors'].includes(hash)}>
                <StyledTabButton aria-haspopup="true" onClick={handleOpenMenu}>
                  Onboarding Form
                </StyledTabButton>
              </Tab>
            </Tabs>
          </Grid>
          <Grid container style={{ padding: 16, minHeight: '100%' }}>
            {hash === '#cost_estimates' && (
              <Grid
                container
                style={{ flexWrap: 'nowrap', backgroundColor: '#fff' }}
              >
                {!isEmpty(selectedSchedule) ? (
                  <>
                    <Grid
                      item
                      style={{ width: 200, flex: 'none', marginTop: 16 }}
                    >
                      <ScheduleTree />
                    </Grid>
                    <Grid item style={{ flexGrow: 1, padding: 16 }}>
                      <Grid container justify="flex-end">
                        <Button
                          color="secondary"
                          variant="contained"
                          onClick={handleOnDownloadCE}
                        >
                          Download Report
                        </Button>
                      </Grid>
                      <Grid
                        container
                        justify="space-between"
                        style={{ margin: '16px 0px' }}
                      >
                        <Grid item style={{ fontWeight: 600 }}>
                          Item of Works
                        </Grid>
                        <Grid item style={{ fontWeight: 600, marginRight: 16 }}>
                          Total: ₱{' '}
                          {totalEstimates.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                          })}
                        </Grid>
                      </Grid>
                      <CostEstimates permission={cePermission} />
                    </Grid>
                  </>
                ) : (
                  <WelcomeWrapper>
                    <WelcomeMessage>
                      It&apos;s time to create estimates!
                    </WelcomeMessage>
                    <ScheduleTree />
                  </WelcomeWrapper>
                )}
              </Grid>
            )}

            {hash === '#purchase_orders' && (
              <Grid
                style={{ width: '100%', backgroundColor: '#fff', padding: 16 }}
              >
                <PurchaseOrders permission={poPermission} />
              </Grid>
            )}

            {hash === '#requests' && (
              <Grid
                style={{ width: '100%', backgroundColor: '#fff', padding: 16 }}
              >
                <RequestMaterials />
              </Grid>
            )}

            {hash === '#received' && (
              <Grid
                style={{ width: '100%', backgroundColor: '#fff', padding: 16 }}
              >
                <ReceivedMaterials permission={omPermission} />
              </Grid>
            )}

            {hash === '#labors' && (
              <Grid
                style={{ width: '100%', backgroundColor: '#fff', padding: 16 }}
              >
                <Labors permission={lPermission} />
              </Grid>
            )}
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}

CostControl.propTypes = {
  fetchSchedule: func,
  fetchProject: func,
  fetchEstimates: func,
  setDefaultActiveChild: func,
  fetchingSchedule: bool,
  selectedSchedule: object,
  resetSelectedSchedule: func,
  totalEstimates: number,
  profile: object,
};

const mapStateToProps = state => {
  const {
    [SCHEDULE]: {
      fetching: fetchingSchedule,
      selectedSchedule,
      schedule: { data: schedules },
    },
    [PROJECT]: { project },
    [ORGANIZATION]: { company },
    [NAMESPACE]: {
      profile,
      costEstimates: { estimates },
    },
  } = state;

  return {
    profile,
    project,
    schedules,
    company,
    estimates,
    selectedSchedule,
    fetchingSchedule,
    totalEstimates: estimates
      .map(({ material_cost, labor_cost, equipment_cost }) => {
        return [...material_cost, ...labor_cost, ...equipment_cost]
          .map(({ amount }) => amount)
          .reduce((total, amount) => (total += amount), 0);
      })
      .reduce((total, amount) => (total += amount), 0),
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchSchedule,
      fetchProject,
      fetchEstimates,
      setDefaultActiveChild,
      resetSelectedSchedule,
    },
    dispatch,
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(CostControl);
