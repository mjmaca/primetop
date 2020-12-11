/*
 *
 * ProjectPage reducer
 *
 */
import produce from 'immer';
import { FETCH_PROJECT, FETCH_PROFILE } from './constants';

export const initialState = {
  fetching: false,
  project: {},
  projects: [],
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
  saving: false,
};

/* eslint-disable default-case, no-param-reassign */
const projectPageReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case FETCH_PROJECT.SUCCESS:
        return {
          ...state,
          fetching: false,
          project: { ...action.project },
        };
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
      default:
        return { ...state };
    }
  });

export default projectPageReducer;
