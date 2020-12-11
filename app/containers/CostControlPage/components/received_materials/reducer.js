import {
  INITIAL_STATE,
  FETCH_RECEIVED_MATERIALS,
  ADD_RECEIVED_MATERIAL,
  SET_RECEIVED_MATERIAL,
  RESET_RECEIVED_MATERIAL,
  UPDATE_RECEIVED_MATERIAL,
} from './constants';

export default (state, action) => {
  switch (action.type) {
    case FETCH_RECEIVED_MATERIALS.REQUEST:
    case FETCH_RECEIVED_MATERIALS.FAILURE:
      return {
        ...state,
        receivedMaterials: {
          ...state.receivedMaterials,
          fetching: action.type === FETCH_RECEIVED_MATERIALS.REQUEST,
        },
      };
    case FETCH_RECEIVED_MATERIALS.SUCCESS: {
      return {
        ...state,
        count: action.receivedMaterials.length,
        receivedMaterials: {
          ...state.receivedMaterials,
          receivedMaterials: [...action.receivedMaterials],
          fetching: false,
        },
      };
    }
    case UPDATE_RECEIVED_MATERIAL.REQUEST:
    case UPDATE_RECEIVED_MATERIAL.FAILURE:
    case ADD_RECEIVED_MATERIAL.REQUEST:
    case ADD_RECEIVED_MATERIAL.FAILURE:
      return {
        ...state,
        receivedMaterials: {
          ...state.receivedMaterials,
          saving:
            action.type === UPDATE_RECEIVED_MATERIAL.REQUEST ||
            action.type === ADD_RECEIVED_MATERIAL.REQUEST,
        },
      };
    case ADD_RECEIVED_MATERIAL.SUCCESS: {
      const receivedMaterials = [
        { ...action.payload },
        ...state.receivedMaterials.receivedMaterials,
      ];

      return {
        ...state,
        count: receivedMaterials.length,
        receivedMaterials: {
          ...state.receivedMaterials,
          receivedMaterials,
          saving: false,
        },
      };
    }
    case UPDATE_RECEIVED_MATERIAL.SUCCESS: {
      const index = state.receivedMaterials.receivedMaterials.findIndex(
        ({ id }) => id === action.payload.id,
      );
      const receivedMaterials = [
        ...state.receivedMaterials.receivedMaterials.slice(0, index),
        { ...action.payload },
        ...state.receivedMaterials.receivedMaterials.slice(index + 1),
      ];

      return {
        ...state,
        receivedMaterials: {
          ...state.receivedMaterials,
          receivedMaterial: { ...action.payload },
          receivedMaterials,
          saving: false,
        },
      };
    }
    case SET_RECEIVED_MATERIAL:
      return {
        ...state,
        receivedMaterials: {
          ...state.receivedMaterials,
          receivedMaterial: { ...action.receivedMaterial },
        },
      };
    case RESET_RECEIVED_MATERIAL:
      return {
        ...state,
        receivedMaterials: {
          ...state.receivedMaterials,
          receivedMaterial: { ...INITIAL_STATE.receivedMaterial },
        },
      };
    default:
      return { ...state };
  }
};
