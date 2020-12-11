import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the fileUploadPage state domain
 */

const selectSupplierListPageDomain = state =>
  state.supplierListPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SupplierListPage
 */

const makeSelectSupplierListPage = () =>
  createSelector(
    selectSupplierListPageDomain,
    substate => substate,
  );

export default makeSelectSupplierListPage;
export { selectSupplierListPageDomain };
