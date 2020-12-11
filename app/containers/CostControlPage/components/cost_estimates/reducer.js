import {
  FETCH_ESTIMATES,
  FETCH_COST_ESTIMATES,
  SET_COST_ESTIMATE,
  UPDATE_COST_ESTIMATES,
} from './constants';

export default (state, action) => {
  switch (action.type) {
    case FETCH_COST_ESTIMATES.REQUEST:
    case FETCH_COST_ESTIMATES.FAILURE:
      return {
        ...state,
        costEstimates: {
          ...state.costEstimates,
          fetching: action.type === FETCH_COST_ESTIMATES.REQUEST,
        },
      };
    case FETCH_COST_ESTIMATES.SUCCESS:
      return {
        ...state,
        costEstimates: {
          ...state.costEstimates,
          fetching: false,
          costEstimates: { ...action.costEstimates },
        },
      };
    case FETCH_ESTIMATES.SUCCESS:
      return {
        ...state,
        costEstimates: {
          ...state.costEstimates,
          fetching: false,
          estimates: [...action.estimates],
        },
      };
    case SET_COST_ESTIMATE:
      return {
        ...state,
        costEstimates: {
          ...state.costEstimates,
          costEstimate: { ...action.costEstimate },
        },
      };
    case UPDATE_COST_ESTIMATES.REQUEST:
    case UPDATE_COST_ESTIMATES.FAILURE:
      return {
        ...state,
        costEstimates: {
          ...state.costEstimates,
          saving: action.type === UPDATE_COST_ESTIMATES.REQUEST,
        },
      };
    case UPDATE_COST_ESTIMATES.SUCCESS: {
      return {
        ...state,
        costEstimates: {
          ...state.costEstimates,
          saving: false,
          costEstimates: { ...action.costEstimates },
        },
      };
    }
    default:
      return { ...state };
  }
};
