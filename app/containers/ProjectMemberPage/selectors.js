import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the projectMemberPage state domain
 */

const selectProjectMemberPageDomain = state =>
  state.projectMemberPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ProjectMemberPage
 */

const makeSelectProjectMemberPage = () =>
  createSelector(
    selectProjectMemberPageDomain,
    substate => substate,
  );

export default makeSelectProjectMemberPage;
export { selectProjectMemberPageDomain };
