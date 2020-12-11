import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the verifyPage state domain
 */

const selectVerifyPageDomain = state => state.verifyPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by VerifyPage
 */

const makeSelectVerifyPage = () =>
  createSelector(
    selectVerifyPageDomain,
    substate => substate,
  );

export default makeSelectVerifyPage;
export { selectVerifyPageDomain };
