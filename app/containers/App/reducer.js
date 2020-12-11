import { FETCH_CURRENT_USER } from './constants';

const initialState = {
  currentUser: null,
  fetching: true, // default should be true
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CURRENT_USER.REQUEST:
    case FETCH_CURRENT_USER.FAILURE:
      return {
        ...state,
        fetching: action.type === FETCH_CURRENT_USER.REQUEST,
      };
    case FETCH_CURRENT_USER.SUCCESS:
      return {
        ...state,
        fetching: false,
        currentUser: action.currentUser,
      };
    default:
      return { ...state };
  }
};
