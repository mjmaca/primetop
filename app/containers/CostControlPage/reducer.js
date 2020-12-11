/*
 *
 * CostEstimates reducer
 *
 */
import produce from 'immer';
import { SET_PAGE, SET_FILTER, SET_MODE } from './constants';

import { INITIAL_STATE as CE_INIT_STATE } from './components/cost_estimates/constants';
import { INITIAL_STATE as PO_INIT_STATE } from './components/purchase_orders/constants';
import { INITIAL_STATE as RECEIVED_MATERIALS_INIT_STATE } from './components/received_materials/constants';
import { INITIAL_STATE as REQUEST_MATERIALS_INIT_STATE } from './components/request_materials/constants';
import { INITIAL_STATE as LABORS_INIT_STATE } from './components/labors/constants';
import CE_REDUCER from './components/cost_estimates/reducer';
import PO_REDUCER from './components/purchase_orders/reducer';
import RECEIVED_MATERIALS_REDUCER from './components/received_materials/reducer';
import REQUEST_MATERIALS_REDUCER from './components/request_materials/reducer';
import LABORS_REDUCER from './components/labors/reducer';

export const initialState = {
  mode: 'list', // list, view, add, edit or delete
  perPage: 10,
  page: 1,
  count: 0,
  filter: {
    date: null,
    keyword: '',
    status: [],
  },
  costEstimates: { ...CE_INIT_STATE },
  purchaseOrders: { ...PO_INIT_STATE },
  receivedMaterials: { ...RECEIVED_MATERIALS_INIT_STATE },
  requestMaterials: { ...REQUEST_MATERIALS_INIT_STATE },
  labors: { ...LABORS_INIT_STATE },
  profile: {
    avatar: '',
    first_name: '',
    last_name: '',
    mobile: '',
    company: '',
    province: '',
    city: '',
    email: '',
    position: 'free',
  },
};

/* eslint-disable default-case, no-param-reassign */
const costEstimatesReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    state = { ...CE_REDUCER(state, action) };
    state = { ...PO_REDUCER(state, action) };
    state = { ...RECEIVED_MATERIALS_REDUCER(state, action) };
    state = { ...REQUEST_MATERIALS_REDUCER(state, action) };
    state = { ...LABORS_REDUCER(state, action) };

    switch (action.type) {
      case SET_MODE:
        return {
          ...state,
          mode: action.mode,
        };
      case SET_PAGE:
        return {
          ...state,
          page: action.page,
        };
      case SET_FILTER:
        return {
          ...state,
          filter: {
            ...state.filter,
            [action.filter]: action.value,
          },
        };
      default:
        return { ...state };
    }
  });

export default costEstimatesReducer;
