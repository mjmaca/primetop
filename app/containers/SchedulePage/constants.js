/*
 *
 * Schedule constants
 *
 */
import { createRequestState } from '../../helpers/request';

export const NAMESPACE = 'SCHEDULE';

export const FETCH_SCHEDULE = createRequestState(`${NAMESPACE}/FETCH_SCHEDULE`);
export const FETCH_PROFILE = createRequestState(`${NAMESPACE}/FETCH_PROFILE`);
export const SAVE_CUSTOM_SCHEDULE = createRequestState(
  `${NAMESPACE}/SAVE_CUSTOM_SCHEDULE`,
);
export const UPDATE_CUSTOM_SCHEDULE = createRequestState(
  `${NAMESPACE}/UPDATE_CUSTOM_SCHEDULE`,
);
export const DELETE_CUSTOM_SCHEDULE = createRequestState(
  `${NAMESPACE}/DELETE_CUSTOM_SCHEDULE`,
);

export const SET_DEFAULT_ACTIVE_CHILD = `${NAMESPACE}/SET_DEFAULT_ACTIVE_CHILD`;
export const SET_ACTIVE_CHILD = `${NAMESPACE}/SET_ACTIVE_CHILD`;
export const SET_SELECTED_SCHEDULE = `${NAMESPACE}/SET_SELECTED_SCHEDULE`;
export const RESET_SELECTED_SCHEDULE = `${NAMESPACE}/RESET_SELECTED_SCHEDULE`;

export const TABS = [{ tab: '#schedule' }, { tab: '#daily_task' }];
