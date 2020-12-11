/*
 *
 * ProjectPage constants
 *
 */

import { createRequestState } from '../../helpers/request';
export const NAMESPACE = 'PROJECT';
export const DEFAULT_ACTION = `app/${NAMESPACE}/DEFAULT_ACTION`;
export const FETCH_PROJECT = createRequestState(`${NAMESPACE}/FETCH_PROJECT`);
export const FETCH_PROFILE = createRequestState(
  `${NAMESPACE}/FETCH_PROFILE.REQUEST`,
);
