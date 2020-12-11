import {
  INITIAL_STATE,
  FETCH_PURCHASE_ORDERS,
  ADD_PURCHASE_ORDER,
  SET_PURCHASE_ORDER,
  RESET_PURCHASE_ORDER,
  UPDATE_PURCHASE_ORDER,
  DELETE_PURCHASE_ORDER,
} from './constants';

export default (state, action) => {
  switch (action.type) {
    case FETCH_PURCHASE_ORDERS.REQUEST:
    case FETCH_PURCHASE_ORDERS.FAILURE:
      return {
        ...state,
        purchaseOrders: {
          ...state.purchaseOrders,
          fetching: action.type === FETCH_PURCHASE_ORDERS.REQUEST,
        },
      };
    case FETCH_PURCHASE_ORDERS.SUCCESS: {
      return {
        ...state,
        count: action.purchaseOrders.length,
        purchaseOrders: {
          ...state.purchaseOrders,
          purchaseOrders: [...action.purchaseOrders],
          fetching: false,
        },
      };
    }
    case DELETE_PURCHASE_ORDER.REQUEST:
    case DELETE_PURCHASE_ORDER.FAILURE:
    case UPDATE_PURCHASE_ORDER.REQUEST:
    case UPDATE_PURCHASE_ORDER.FAILURE:
    case ADD_PURCHASE_ORDER.REQUEST:
    case ADD_PURCHASE_ORDER.FAILURE:
      return {
        ...state,
        purchaseOrders: {
          ...state.purchaseOrders,
          saving:
            action.type === UPDATE_PURCHASE_ORDER.REQUEST ||
            action.type === ADD_PURCHASE_ORDER.REQUEST,
        },
      };
    case ADD_PURCHASE_ORDER.SUCCESS: {
      const purchaseOrders = [
        { ...action.payload },
        ...state.purchaseOrders.purchaseOrders,
      ];

      return {
        ...state,
        count: purchaseOrders.length,
        purchaseOrders: {
          ...state.purchaseOrders,
          purchaseOrders,
          saving: false,
        },
      };
    }
    case UPDATE_PURCHASE_ORDER.SUCCESS: {
      const index = state.purchaseOrders.purchaseOrders.findIndex(
        ({ id }) => id === action.payload.id,
      );
      const purchaseOrders = [
        ...state.purchaseOrders.purchaseOrders.slice(0, index),
        { ...action.payload },
        ...state.purchaseOrders.purchaseOrders.slice(index + 1),
      ];

      return {
        ...state,
        purchaseOrders: {
          ...state.purchaseOrders,
          purchaseOrder: { ...action.payload },
          purchaseOrders,
          saving: false,
        },
      };
    }
    case DELETE_PURCHASE_ORDER.SUCCESS: {
      const index = state.purchaseOrders.purchaseOrders.findIndex(
        ({ id }) => id === action.payload.id,
      );
      const purchaseOrders = [
        ...state.purchaseOrders.purchaseOrders.slice(0, index),
        ...state.purchaseOrders.purchaseOrders.slice(index + 1),
      ];

      return {
        ...state,
        purchaseOrders: {
          ...state.purchaseOrders,
          purchaseOrders,
          saving: false,
        },
      };
    }
    case SET_PURCHASE_ORDER:
      return {
        ...state,
        purchaseOrders: {
          ...state.purchaseOrders,
          purchaseOrder: { ...action.purchaseOrder },
        },
      };
    case RESET_PURCHASE_ORDER:
      return {
        ...state,
        purchaseOrders: {
          ...state.purchaseOrders,
          purchaseOrder: { ...INITIAL_STATE.purchaseOrder },
        },
      };
    default:
      return { ...state };
  }
};
