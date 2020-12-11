import { createRequestState } from '../../helpers/request';

export const NAMESPACE = 'AUTH';
export const MODE = {
  SIGN_IN: 'SIGN_IN',
  SIGN_UP: 'SIGN_UP',
  FORGOT_PASSWORD: 'FORGOT_PASSWORD',
};

export const SIGN_IN = createRequestState(`${NAMESPACE}/SIGN_IN`);
export const SIGN_UP = createRequestState(`${NAMESPACE}/SIGN_UP`);
export const RESET_PASSWORD = createRequestState(`${NAMESPACE}/RESET_PASSWORD`);

export const CHANGE_MODE = `${NAMESPACE}/CHANGE_MODE`;
