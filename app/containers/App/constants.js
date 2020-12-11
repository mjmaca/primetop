import { createRequestState } from '../../helpers/request';

export const NAMESPACE = 'APP';

export const FETCH_CURRENT_USER = createRequestState(
  `${NAMESPACE}/FETCH_CURRENT_USER`,
);
