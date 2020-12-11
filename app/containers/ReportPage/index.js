/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
/* eslint-disable no-shadow */
/**
 *
 * ReportPage
 *
 */

import React, { memo, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { useParams } from 'react-router-dom';
import { func, object, array, bool } from 'prop-types';
import { isEmpty } from 'lodash';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

import Sidebar from 'components/Sidebar';

import { fetchProject } from 'containers/ProjectPage/actions';
import { fetchSchedule } from 'containers/SchedulePage/actions';
import {
  fetchEstimates,
  fetchReceivedMaterials,
  fetchLabors,
} from 'containers/CostControlPage/actions';
import { fetchProfile } from 'containers/ProfilePage/actions';
import { fetchCompany } from 'containers/OrganizationPage/actions';
import ProAccountWelcome from 'components/ProAccountWelcome';
import { NAMESPACE as PROFILE } from 'containers/ProfilePage/constants';
import { NAMESPACE as ORGANIZATION } from 'containers/OrganizationPage/constants';
import { NAMESPACE as PROJECT } from 'containers/ProjectPage/constants';
import { NAMESPACE as COST_CONTROL } from 'containers/CostControlPage/constants';
import { NAMESPACE as SCHEDULE } from 'containers/SchedulePage/constants';
import {
  getTotalEstimates,
  getTotalReceivedMaterials,
  getTotalLabors,
} from '../../helpers';

import ScheduleSummary from './components/ScheduleSummary';
import CostBreakdown from './components/CostBreakdown';
import excel from './components/excel';

import {
  Loading,
  StyledReports,
  FinancialReportSummary,
  Summary,
  SummaryItem,
  SummaryWrapper,
  Label,
  NumberCurrency,
  GraphWrapper,
  GraphItem,
  StyledButton,
  StyledTooltip,
} from './styles';

export function ReportPage(props) {
  const {
    project,
    estimates,
    receivedMaterials,
    labors,
    company,
    fetchProject,
    fetchSchedule,
    fetchEstimates,
    fetchReceivedMaterials,
    fetchLabors,
    fetchCompany,
    fetchingCompany,
    fetchProfile,
    profile,
  } = props;
  const { projectId } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const total_project_cost = Number(
    !isEmpty(project) && project.amount
      ? project.amount.split(',').join('')
      : 0,
  );
  const total_estimated_cost = getTotalEstimates(estimates);
  const total_labor_cost = getTotalLabors(labors);
  const total_received_materials = getTotalReceivedMaterials(receivedMaterials);
  const total_actual_cost = total_received_materials + total_labor_cost;
  const total_savings = total_estimated_cost - total_actual_cost;
  const total_profit = total_project_cost - total_actual_cost;
  let total_material_cost = 0;
  let total_equipment_cost = 0;
  let estimated_material_cost = 0;
  let estimated_labor_cost = 0;
  let estimated_equipment_cost = 0;

  receivedMaterials.forEach(({ items }) => {
    items.forEach(({ acquisition_type, amount }) => {
      /** if received items has acquisition type 'buy'
       * it means that the item is an equipment.
       * Otherwise, the items is material
       */
      if (acquisition_type === 'buy') {
        total_equipment_cost += amount;
      } else {
        total_material_cost += amount;
      }
    });
  });

  estimates.forEach(({ material_cost, labor_cost, equipment_cost }) => {
    /** sum of all material cost */
    estimated_material_cost += material_cost
      .map(({ amount }) => amount)
      .reduce((total, amount) => (total += amount), 0);

    /** sum of all labor cost */
    estimated_labor_cost += labor_cost
      .map(({ amount }) => amount)
      .reduce((total, amount) => (total += amount), 0);

    /** sum of all equipment cost */
    estimated_equipment_cost += equipment_cost
      .map(({ amount }) => amount)
      .reduce((total, amount) => (total += amount), 0);
  });

  const toMoneyFormat = num =>
    num.toLocaleString(undefined, {
      minimumFractionDigits: 2,
    });

  useEffect(() => {
    fetchData();
  }, []);

  const handleOnClickDownload = () => {
    excel({
      ...props,
      total_project_cost,
      total_estimated_cost,
      total_actual_cost,
      total_savings,
      total_profit,
      total_material_cost,
      total_equipment_cost,
      estimated_material_cost,
      estimated_equipment_cost,
    });
  };

  const fetchData = async () => {
    setIsLoading(true);
    await Promise.all([
      fetchProject(projectId),
      fetchSchedule(projectId),
      fetchEstimates(projectId),
      fetchReceivedMaterials(projectId),
      fetchLabors(projectId),
      fetchCompany(),
      fetchProfile(),
    ]);
    setIsLoading(false);
  };

  const hasAccess =
    company.subscription_type === 'premium' &&
    ['co', 'pm'].includes(profile.position);

  if (!fetchingCompany && !hasAccess) {
    return (
      <Grid
        container
        style={{ minHeight: '100vh', height: '100%', flexWrap: 'nowrap' }}
      >
        <Grid item style={{ flex: 'none' }}>
          <Sidebar />
        </Grid>
        <Grid item style={{ width: '100%', backgroundColor: '#ddd' }}>
          <ProAccountWelcome />
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid
      container
      style={{ minHeight: '100vh', height: '100%', flexWrap: 'nowrap' }}
    >
      <Grid item style={{ flex: 'none' }}>
        <Sidebar />
      </Grid>

      <Grid item style={{ width: '100%', backgroundColor: '#ddd' }}>
        <Grid
          container
          style={{ backgroundColor: '#fff', marginLeft: -1, height: '100%' }}
        >
          {isLoading || fetchingCompany ? (
            <Loading>
              <CircularProgress style={{ color: '#3f51b5' }} />
              Please wait...
            </Loading>
          ) : (
            <StyledReports>
              <Grid container justify="flex-end" style={{ paddingRight: 16 }}>
                <StyledButton
                  variant="contained"
                  onClick={handleOnClickDownload}
                >
                  Download
                </StyledButton>
              </Grid>
              <FinancialReportSummary>
                <Summary>
                  <div className="title">Financial Report Summary</div>
                  <SummaryItem>
                    <SummaryWrapper>
                      <div>
                        <Label>
                          Total Project Cost
                          <StyledTooltip
                            arrow
                            placement="top"
                            title="Value that is set upon creating of project"
                          >
                            <InfoOutlinedIcon style={{ width: 16 }} />
                          </StyledTooltip>
                        </Label>
                        <NumberCurrency>
                          ₱ {toMoneyFormat(total_project_cost)}
                        </NumberCurrency>
                      </div>
                    </SummaryWrapper>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryWrapper>
                      <div>
                        <Label>
                          Profit
                          <StyledTooltip
                            arrow
                            placement="top"
                            title="Profit is the value from Total Project Cost less the Total Actual Cost"
                          >
                            <InfoOutlinedIcon style={{ width: 16 }} />
                          </StyledTooltip>
                        </Label>
                        <NumberCurrency>
                          ₱ {toMoneyFormat(total_profit)}
                        </NumberCurrency>
                      </div>
                    </SummaryWrapper>
                  </SummaryItem>
                </Summary>
                <Summary>
                  <SummaryItem>
                    <SummaryWrapper>
                      <div>
                        <Label>
                          Total Estimated Cost
                          <StyledTooltip
                            arrow
                            placement="top"
                            title="The Estimated Cost is the summation of Materials, Labor and Equipment Cost"
                          >
                            <InfoOutlinedIcon style={{ width: 16 }} />
                          </StyledTooltip>
                        </Label>
                        <NumberCurrency>
                          ₱ {toMoneyFormat(total_estimated_cost)}
                        </NumberCurrency>
                      </div>
                    </SummaryWrapper>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryWrapper>
                      <div>
                        <Label>
                          Total Actual Cost
                          <StyledTooltip
                            arrow
                            placement="top"
                            title="Total Actual Cost is the summation of total received materials and equipments plus labor cost"
                          >
                            <InfoOutlinedIcon style={{ width: 16 }} />
                          </StyledTooltip>
                        </Label>
                        <NumberCurrency>
                          ₱ {toMoneyFormat(total_actual_cost)}
                        </NumberCurrency>
                      </div>
                    </SummaryWrapper>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryWrapper>
                      <div>
                        <Label>
                          Savings
                          <StyledTooltip
                            arrow
                            placement="top"
                            title="Savings is the Total Estimated Cost less the Total Actual Cost"
                          >
                            <InfoOutlinedIcon style={{ width: 16 }} />
                          </StyledTooltip>
                        </Label>
                        <NumberCurrency>
                          ₱ {toMoneyFormat(total_savings)}
                        </NumberCurrency>
                      </div>
                    </SummaryWrapper>
                  </SummaryItem>
                </Summary>
              </FinancialReportSummary>
              <GraphWrapper>
                <GraphItem style={{ width: '40%' }}>
                  <ScheduleSummary />
                </GraphItem>
                <GraphItem style={{ width: '60%' }}>
                  <CostBreakdown
                    {...{
                      total_material_cost,
                      total_labor_cost,
                      total_equipment_cost,
                      estimated_material_cost,
                      estimated_labor_cost,
                      estimated_equipment_cost,
                    }}
                  />
                </GraphItem>
              </GraphWrapper>
            </StyledReports>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

ReportPage.propTypes = {
  fetchProject: func,
  fetchSchedule: func,
  fetchEstimates: func,
  fetchProfile: func,
  fetchReceivedMaterials: func,
  fetchLabors: func,
  fetchCompany: func,
  profile: object,
  company: object,
  project: object,
  estimates: array,
  receivedMaterials: array,
  labors: array,
  fetchingCompany: bool,
};

const mapStateToProps = state => {
  const {
    [PROJECT]: { project },
    [PROFILE]: { profile },
    [ORGANIZATION]: { company, fetching },
    [COST_CONTROL]: {
      costEstimates: { estimates },
      receivedMaterials: { receivedMaterials },
      labors: { labors },
    },
    [SCHEDULE]: {
      schedule: { data: schedules },
    },
  } = state;

  return {
    project,
    company,
    estimates,
    receivedMaterials,
    labors,
    profile,
    fetchingCompany: fetching,
    schedules,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchProject,
      fetchSchedule,
      fetchEstimates,
      fetchReceivedMaterials,
      fetchLabors,
      fetchCompany,
      fetchProfile,
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
)(ReportPage);
