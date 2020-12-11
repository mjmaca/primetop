import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the onboard state domain
 */

const selectOnboardDomain = state => state.onboard || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Onboard
 */

const makeSelectOnboard = () =>
  createSelector(
    selectOnboardDomain,
    substate => substate,
  );

export default makeSelectOnboard;
export { selectOnboardDomain };
