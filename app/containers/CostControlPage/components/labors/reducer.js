import {
  INITIAL_STATE,
  FETCH_LABORS,
  ADD_LABOR,
  SET_LABOR,
  RESET_LABOR,
  UPDATE_LABOR,
} from './constants';

export default (state, action) => {
  switch (action.type) {
    case FETCH_LABORS.REQUEST:
    case FETCH_LABORS.FAILURE:
      return {
        ...state,
        labors: {
          ...state.labors,
          fetching: action.type === FETCH_LABORS.REQUEST,
        },
      };
    case FETCH_LABORS.SUCCESS: {
      return {
        ...state,
        count: action.labors.length,
        labors: {
          ...state.labors,
          labors: [...action.labors],
          fetching: false,
        },
      };
    }
    case UPDATE_LABOR.REQUEST:
    case UPDATE_LABOR.FAILURE:
    case ADD_LABOR.REQUEST:
    case ADD_LABOR.FAILURE:
      return {
        ...state,
        labors: {
          ...state.labors,
          saving:
            action.type === UPDATE_LABOR.REQUEST ||
            action.type === ADD_LABOR.REQUEST,
        },
      };
    case ADD_LABOR.SUCCESS: {
      const labors = [{ ...action.payload }, ...state.labors.labors];

      return {
        ...state,
        count: labors.length,
        labors: {
          ...state.labors,
          labors,
          saving: false,
        },
      };
    }
    case UPDATE_LABOR.SUCCESS: {
      const index = state.labors.labors.findIndex(
        ({ id }) => id === action.payload.id,
      );
      const labors = [
        ...state.labors.labors.slice(0, index),
        { ...action.payload },
        ...state.labors.labors.slice(index + 1),
      ];

      return {
        ...state,
        labors: {
          ...state.labors,
          labor: { ...action.payload },
          labors,
          saving: false,
        },
      };
    }
    case SET_LABOR:
      return {
        ...state,
        labors: {
          ...state.labors,
          labor: { ...action.labor },
        },
      };
    case RESET_LABOR:
      return {
        ...state,
        labors: {
          ...state.labors,
          labor: { ...INITIAL_STATE.labor },
        },
      };
    default:
      return { ...state };
  }
};
