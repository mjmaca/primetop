import {
  SIGN_IN,
  SIGN_UP,
  RESET_PASSWORD,
  CHANGE_MODE,
  MODE,
} from './constants';

const initialState = {
  loading: false,
  mode: MODE.SIGN_UP,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_MODE:
      return {
        ...state,
        mode: action.mode,
      };
    case SIGN_IN.REQUEST:
    case SIGN_UP.REQUEST:
    case RESET_PASSWORD.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SIGN_IN.SUCCESS:
    case SIGN_IN.FAILURE:
    case SIGN_UP.SUCCESS:
    case SIGN_UP.FAILURE:
    case RESET_PASSWORD.SUCCESS:
    case RESET_PASSWORD.FAILURE:
      return {
        ...state,
        loading: false,
      };
    default: {
      return state;
    }
  }
};
