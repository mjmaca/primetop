/*
 *
 * OrganizationPage constants
 *
 */

import { createRequestState } from '../../helpers/request';

export const NAMESPACE = 'ORGANIZATION';

export const FETCH_COMPANY = createRequestState(`${NAMESPACE}/FETCH_COMPANY`);
export const FETCH_COMPANY_MEMBERS = createRequestState(
  `${NAMESPACE}/FETCH_COMPANY_MEMBERS`,
);
export const UPDATE_COMPANY = createRequestState(`${NAMESPACE}/UPDATE_COMPANY`);
export const UPDATE_USER_ROLE = createRequestState(
  `${NAMESPACE}/UPDATE_USER_ROLE`,
);

export const ROLE_MAPPING = {
  free: 'Default',
  co: 'Contractor',
  pm: 'Project Manager',
  qs: 'Quality Surveyor',
  se: 'Engineer',
};

export const STATUS_MAPPING = {
  active: {
    color: '#47B881',
    name: 'Active',
  },
  inactive: {
    color: '#D9822B',
    name: 'Inactive',
  },
};
