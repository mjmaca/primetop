/*
 *
 * ProfilePage reducer
 *
 */
import produce from 'immer';
import { FETCH_PROFILE, UPDATE_PROFILE, UPLOAD_AVATAR } from './constants';

export const initialState = {
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
  fetching: false,
  saving: false,
  uploading: false,
};

/* eslint-disable default-case, no-param-reassign */
const profilePageReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case FETCH_PROFILE.REQUEST:
        return {
          ...state,
          fetching: true,
        };
      case FETCH_PROFILE.SUCCESS:
        return {
          ...state,
          profile: { ...action.profile },
          fetching: false,
        };
      case FETCH_PROFILE.FAILURE:
        return {
          ...state,
          fetching: false,
        };
      case UPDATE_PROFILE.REQUEST:
        return {
          ...state,
          saving: true,
        };
      case UPDATE_PROFILE.SUCCESS:
        return {
          ...state,
          saving: false,
          profile: {
            ...state.profile,
            ...action.profile,
          },
        };
      case UPDATE_PROFILE.FAILURE:
        return {
          ...state,
          saving: false,
        };
      case UPLOAD_AVATAR.REQUEST:
      case UPLOAD_AVATAR.FAILURE:
        return {
          ...state,
          uploading: action.type === UPLOAD_AVATAR.REQUEST,
        };
      case UPLOAD_AVATAR.SUCCESS:
        return {
          ...state,
          uploading: false,
        };
      default:
        return state;
    }
  });

export default profilePageReducer;
