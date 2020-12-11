import {
  INITIAL_STATE,
  FETCH_REQUEST_MATERIALS,
  ADD_REQUEST_MATERIAL,
  SET_REQUEST_MATERIAL,
  RESET_REQUEST_MATERIAL,
  UPDATE_REQUEST_MATERIAL,
} from './constants';

export default (state, action) => {
  switch (action.type) {
    case FETCH_REQUEST_MATERIALS.REQUEST:
    case FETCH_REQUEST_MATERIALS.FAILURE:
      return {
        ...state,
        requestMaterials: {
          ...state.requestMaterials,
          fetching: action.type === FETCH_REQUEST_MATERIALS.REQUEST,
        },
      };
    case FETCH_REQUEST_MATERIALS.SUCCESS: {
      return {
        ...state,
        count: action.requestMaterials.length,
        requestMaterials: {
          ...state.requestMaterials,
          requestMaterials: [...action.requestMaterials],
          fetching: false,
        },
      };
    }
    case UPDATE_REQUEST_MATERIAL.REQUEST:
    case UPDATE_REQUEST_MATERIAL.FAILURE:
    case ADD_REQUEST_MATERIAL.REQUEST:
    case ADD_REQUEST_MATERIAL.FAILURE:
      return {
        ...state,
        requestMaterials: {
          ...state.requestMaterials,
          saving:
            action.type === UPDATE_REQUEST_MATERIAL.REQUEST ||
            action.type === ADD_REQUEST_MATERIAL.REQUEST,
        },
      };
    case ADD_REQUEST_MATERIAL.SUCCESS: {
      const requestMaterials = [
        { ...action.payload },
        ...state.requestMaterials.requestMaterials,
      ];

      return {
        ...state,
        count: requestMaterials.length,
        requestMaterials: {
          ...state.requestMaterials,
          requestMaterials,
          saving: false,
        },
      };
    }
    case UPDATE_REQUEST_MATERIAL.SUCCESS: {
      const index = state.requestMaterials.requestMaterials.findIndex(
        ({ id }) => id === action.payload.id,
      );
      const requestMaterials = [
        ...state.requestMaterials.requestMaterials.slice(0, index),
        { ...action.payload },
        ...state.requestMaterials.requestMaterials.slice(index + 1),
      ];

      return {
        ...state,
        requestMaterials: {
          ...state.requestMaterials,
          requestMaterial: { ...action.payload },
          requestMaterials,
          saving: false,
        },
      };
    }
    case SET_REQUEST_MATERIAL:
      return {
        ...state,
        requestMaterials: {
          ...state.requestMaterials,
          requestMaterial: { ...action.requestMaterial },
        },
      };
    case RESET_REQUEST_MATERIAL:
      return {
        ...state,
        requestMaterials: {
          ...state.requestMaterials,
          requestMaterial: { ...INITIAL_STATE.requestMaterial },
        },
      };
    default:
      return { ...state };
  }
};
