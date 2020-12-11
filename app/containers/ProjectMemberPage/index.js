/* eslint-disable no-shadow */
/**
 *
 * ProjectMemberPage
 *
 */

import React, { useEffect } from 'react';
import { func, object, bool } from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { Grid } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import ProAccountWelcome from 'components/ProAccountWelcome';
import Sidebar from 'components/Sidebar';
import { fetchCompany } from 'containers/OrganizationPage/actions';
import { NAMESPACE as ORGANIZATION } from 'containers/OrganizationPage/constants';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useHistory, useParams } from 'react-router-dom';
import reducer from './reducer';
import saga from './saga';

import { Loading } from './styles';

export function ProjectMemberPage(props) {
  const { company, fetchCompany, fetchingCompany } = props;
  const history = useHistory();
  const { projectId } = useParams();
  useInjectReducer({ key: 'projectMemberPage', reducer });
  useInjectSaga({ key: 'projectMemberPage', saga });

  useEffect(() => {
    fetchCompany();
  }, []);

  if (company.subscription_type === 'premium') {
    history.push(`/organization/${projectId}`);
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
        {fetchingCompany ? (
          <Loading>
            <CircularProgress style={{ color: '#3f51b5' }} />
            Please wait...
          </Loading>
        ) : (
          <ProAccountWelcome />
        )}
      </Grid>
    </Grid>
  );
}

ProjectMemberPage.propTypes = {
  fetchCompany: func,
  company: object,
  fetchingCompany: bool,
};

const mapStateToProps = state => {
  const {
    [ORGANIZATION]: { company, fetching },
  } = state;

  return { company, fetchingCompany: fetching };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchCompany,
    },
    dispatch,
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ProjectMemberPage);
