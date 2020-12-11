/*
 *
 * OrganizationPage reducer
 *
 */
import produce from 'immer';
import {
  FETCH_COMPANY,
  FETCH_COMPANY_MEMBERS,
  UPDATE_COMPANY,
} from './constants';

export const initialState = {
  fetching: false,
  saving: false,
  members: [],
  company: {},
  owner: {},
};

/* eslint-disable default-case, no-param-reassign */
const organizationPageReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case FETCH_COMPANY_MEMBERS.REQUEST:
      case FETCH_COMPANY.REQUEST:
        return {
          ...state,
          fetching: true,
        };
      case FETCH_COMPANY.SUCCESS:
        return {
          ...state,
          company: { ...action.company },
          owner: { ...action.owner },
          fetching: false,
        };
      case FETCH_COMPANY_MEMBERS.SUCCESS:
        return {
          ...state,
          members: [...action.members],
          fetching: false,
        };
      case FETCH_COMPANY_MEMBERS.FAILURE:
      case FETCH_COMPANY.FAILURE:
        return {
          ...state,
          fetching: false,
        };
      case UPDATE_COMPANY.REQUEST:
      case UPDATE_COMPANY.FAILURE:
        return {
          ...state,
          saving: action.type === UPDATE_COMPANY.REQUEST,
        };
      case UPDATE_COMPANY.SUCCESS:
        return {
          ...state,
          saving: false,
          company: { ...action.company },
        };
      default:
        return { ...state };
    }
  });

export default organizationPageReducer;
