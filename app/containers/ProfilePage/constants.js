/*
 *
 * ProfilePage constants
 *
 */

import { createRequestState } from '../../helpers/request';

export const NAMESPACE = 'PROFILE';

export const FETCH_PROFILE = createRequestState(
  `${NAMESPACE}/FETCH_PROFILE.REQUEST`,
);

export const UPDATE_PROFILE = createRequestState(
  `${NAMESPACE}/UPDATE_PROFILE.REQUEST`,
);

export const UPLOAD_AVATAR = createRequestState(
  `${NAMESPACE}/UPLOAD_AVATAR.REQUEST`,
);
