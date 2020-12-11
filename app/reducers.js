/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from 'utils/history';

import AppReducer from 'containers/App/reducer';
import * as AppConstants from 'containers/App/constants';

import AuthReducer from 'components/Auth/reducer';
import * as AuthConstants from 'components/Auth/constants';

import ProfileReducer from 'containers/ProfilePage/reducer';
import * as ProfileConstants from 'containers/ProfilePage/constants';

import ProjectReducer from 'containers/ProjectPage/reducer';
import * as ProjectConstants from 'containers/ProjectPage/constants';

import ScheduleReducer from 'containers/SchedulePage/reducer';
import * as ScheduleConstants from 'containers/SchedulePage/constants';

import CostControlReducer from 'containers/CostControlPage/reducer';
import * as CostControlConstants from 'containers/CostControlPage/constants';

import OrganizationReducer from 'containers/OrganizationPage/reducer';
import * as OrganizationConstants from 'containers/OrganizationPage/constants';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    router: connectRouter(history),
    [AppConstants.NAMESPACE]: AppReducer,
    [AuthConstants.NAMESPACE]: AuthReducer,
    [ProfileConstants.NAMESPACE]: ProfileReducer,
    [ProjectConstants.NAMESPACE]: ProjectReducer,
    [ScheduleConstants.NAMESPACE]: ScheduleReducer,
    [CostControlConstants.NAMESPACE]: CostControlReducer,
    [OrganizationConstants.NAMESPACE]: OrganizationReducer,
    ...injectedReducers,
  });

  return rootReducer;
}
