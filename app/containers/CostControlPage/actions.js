/*
 *
 * CostControl actions
 *
 */

import { SET_PAGE, SET_FILTER, SET_MODE } from './constants';

export * from './components/cost_estimates/actions';
export * from './components/purchase_orders/actions';
export * from './components/received_materials/actions';
export * from './components/request_materials/actions';
export * from './components/labors/actions';

export const setMode = mode => dispatch => {
  dispatch({ type: SET_MODE, mode });
};

export const setPage = page => dispatch => {
  dispatch({ type: SET_PAGE, page });
};

export const setFilter = (filter, value) => dispatch => {
  dispatch({ type: SET_FILTER, filter, value });
};
