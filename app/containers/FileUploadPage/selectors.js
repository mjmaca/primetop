import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the fileUploadPage state domain
 */

const selectFileUploadPageDomain = state =>
  state.fileUploadPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by FileUploadPage
 */

const makeSelectFileUploadPage = () =>
  createSelector(
    selectFileUploadPageDomain,
    substate => substate,
  );

export default makeSelectFileUploadPage;
export { selectFileUploadPageDomain };
