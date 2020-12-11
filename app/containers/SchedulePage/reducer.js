/*
 *
 * Schedule reducer
 *
 */
import produce from 'immer';
import {
  SET_ACTIVE_CHILD,
  SET_DEFAULT_ACTIVE_CHILD,
  SET_SELECTED_SCHEDULE,
  RESET_SELECTED_SCHEDULE,
  FETCH_SCHEDULE,
  FETCH_PROFILE,
  SAVE_CUSTOM_SCHEDULE,
  UPDATE_CUSTOM_SCHEDULE,
  DELETE_CUSTOM_SCHEDULE,
} from './constants';

export const initialState = {
  fetching: false,
  saving: false,
  activeChild: {},
  selectedSchedule: {},
  schedule: {
    id: '',
    data: [],
    links: [],
    update_date: '',
  },
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
};

/* eslint-disable default-case, no-param-reassign */
const scheduleReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case FETCH_SCHEDULE.REQUEST:
        return {
          ...state,
          fetching: true,
        };
      case FETCH_SCHEDULE.SUCCESS:
        return {
          ...state,
          fetching: false,
          schedule: { ...action.schedule },
        };
      case FETCH_SCHEDULE.FAILURE:
        return {
          ...state,
          fetching: false,
        };
      case SET_DEFAULT_ACTIVE_CHILD:
        return {
          ...state,
          selectedSchedule: { ...action.selectedSchedule },
          activeChild: { ...action.activeChild },
        };
      case SET_ACTIVE_CHILD:
        return {
          ...state,
          activeChild: { ...action.activeChild },
        };
      case SET_SELECTED_SCHEDULE:
        return {
          ...state,
          selectedSchedule: { ...action.selectedSchedule },
        };
      case RESET_SELECTED_SCHEDULE:
        return {
          ...state,
          selectedSchedule: {},
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
      case UPDATE_CUSTOM_SCHEDULE.REQUEST:
      case UPDATE_CUSTOM_SCHEDULE.FAILURE:
      case SAVE_CUSTOM_SCHEDULE.REQUEST:
      case SAVE_CUSTOM_SCHEDULE.FAILURE:
        return {
          ...state,
          saving: action.type === SAVE_CUSTOM_SCHEDULE.REQUEST,
        };
      case SAVE_CUSTOM_SCHEDULE.SUCCESS:
        return {
          ...state,
          saving: false,
          schedule: {
            ...state.schedule,
            data: [...state.schedule.data, action.custom_schedule],
          },
        };
      case UPDATE_CUSTOM_SCHEDULE.SUCCESS: {
        const { data } = state.schedule;
        const index = data.findIndex(
          ({ id }) => id === action.custom_schedule.id,
        );

        return {
          ...state,
          saving: false,
          schedule: {
            ...state.schedule,
            data: [
              ...data.slice(0, index),
              action.custom_schedule,
              ...data.slice(index + 1),
            ],
          },
        };
      }
      case DELETE_CUSTOM_SCHEDULE.SUCCESS: {
        const { data } = state.schedule;
        const index = data.findIndex(
          ({ id }) => id === action.custom_schedule_id,
        );

        return {
          ...state,
          saving: false,
          schedule: {
            ...state.schedule,
            data: [...data.slice(0, index), ...data.slice(index + 1)],
          },
        };
      }
      default:
        return { ...state };
    }
  });

export default scheduleReducer;
