/*
 *
 * Onboard constants
 *
 */

import { createRequestState } from 'helpers/request';
export const DEFAULT_ACTION = 'app/Onboard/DEFAULT_ACTION';
export const NAME_SPACE = 'ONBOARD';
export const CREATE_COMPANY = createRequestState(
  `${NAME_SPACE}/CREATE_COMPANY`,
);
export const CREATE_USER = createRequestState(`${NAME_SPACE}/CREATE_USER`);
export const GET_COMPANY = createRequestState(`${NAME_SPACE}/GET_COMPANY`);
export const UPDATE_COMPANY = createRequestState(
  `${NAME_SPACE}/UPDATE_COMPANY`,
);
