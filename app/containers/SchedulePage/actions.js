/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
/*
 *
 * Schedule actions
 *
 */
import firebase from 'firebase/app';
import { isEmpty } from 'lodash';

import {
  NAMESPACE,
  FETCH_SCHEDULE,
  SET_ACTIVE_CHILD,
  SET_DEFAULT_ACTIVE_CHILD,
  SET_SELECTED_SCHEDULE,
  RESET_SELECTED_SCHEDULE,
  FETCH_PROFILE,
  SAVE_CUSTOM_SCHEDULE,
  UPDATE_CUSTOM_SCHEDULE,
  DELETE_CUSTOM_SCHEDULE,
} from './constants';

import { initialState } from './reducer';

export const fetchSchedule = projectId => async dispatch => {
  dispatch({ type: FETCH_SCHEDULE.REQUEST });

  try {
    const schedule = await firebase
      .firestore()
      .collection('projects')
      .doc(projectId)
      .collection('schedule')
      .get();

    const custom_schedule = await firebase
      .firestore()
      .collection('projects')
      .doc(projectId)
      .collection('custom_schedule')
      .orderBy('create_date')
      .get();

    let schedules = [];
    const doc = schedule.docs[0];

    if (schedule.docs.length) {
      const { data } = doc.data();

      schedules = [
        ...data.map(d => {
          d.parent = Number(d.parent);
          return d;
        }),
      ];
    }

    if (custom_schedule.docs.length) {
      schedules = [
        ...schedules,
        ...custom_schedule.docs.map(d => ({ id: d.id, ...d.data() })),
      ];
    }

    dispatch({
      type: FETCH_SCHEDULE.SUCCESS,
      schedule: {
        // sanitized data before sending to redux
        data: schedules,
      },
    });
  } catch (error) {
    dispatch({ type: FETCH_SCHEDULE.FAILURE });
    throw error;
  }
};

export const saveCustomSchedule = (projectId, payload) => async dispatch => {
  dispatch({ type: SAVE_CUSTOM_SCHEDULE.REQUEST });
  try {
    const { id } = await firebase
      .firestore()
      .collection('projects')
      .doc(projectId)
      .collection('custom_schedule')
      .add(payload);
    const custom_schedule = { id, ...payload };

    dispatch({
      type: SAVE_CUSTOM_SCHEDULE.SUCCESS,
      custom_schedule,
    });

    return custom_schedule;
  } catch (error) {
    dispatch({ type: SAVE_CUSTOM_SCHEDULE.FAILURE });
    throw error;
  }
};

export const updateCustomSchedule = (
  projectId,
  custom_schedule,
) => async dispatch => {
  dispatch({ type: UPDATE_CUSTOM_SCHEDULE.REQUEST });
  try {
    const { id, ...payload } = custom_schedule;

    await firebase
      .firestore()
      .collection('projects')
      .doc(projectId)
      .collection('custom_schedule')
      .doc(id)
      .set(payload);

    dispatch({
      type: UPDATE_CUSTOM_SCHEDULE.SUCCESS,
      custom_schedule,
    });

    return custom_schedule;
  } catch (error) {
    dispatch({ type: UPDATE_CUSTOM_SCHEDULE.FAILURE });
    throw error;
  }
};

export const deleteCustomSchedule = (
  projectId,
  scheduleId,
) => async dispatch => {
  dispatch({ type: DELETE_CUSTOM_SCHEDULE.REQUEST });
  try {
    await firebase
      .firestore()
      .collection('projects')
      .doc(projectId)
      .collection('custom_schedule')
      .doc(scheduleId)
      .delete();

    dispatch({
      type: DELETE_CUSTOM_SCHEDULE.SUCCESS,
      custom_schedule_id: scheduleId,
    });
  } catch (error) {
    dispatch({ type: DELETE_CUSTOM_SCHEDULE.FAILURE });
    throw error;
  }
};

export const setDefaultActiveChild = () => (dispatch, getState) => {
  const {
    [NAMESPACE]: {
      schedule: { data },
    },
  } = getState();
  const activeChild = {};

  const getFirstChildWithNoChild = item => {
    activeChild[item.id] = true;
    const children = data.filter(({ parent }) => parent === item.id);
    if (isEmpty(children)) {
      return item;
    }

    return getFirstChildWithNoChild(children[0]);
  };

  const selectedSchedule = !isEmpty(data)
    ? getFirstChildWithNoChild(data.filter(({ parent }) => !parent)[0])
    : {};

  dispatch({ type: SET_DEFAULT_ACTIVE_CHILD, selectedSchedule, activeChild });
};

export const setActiveChild = activeChild => dispatch => {
  dispatch({ type: SET_ACTIVE_CHILD, activeChild });
};

export const setSelectedSchedule = selectedSchedule => dispatch => {
  dispatch({ type: SET_SELECTED_SCHEDULE, selectedSchedule });
};

export const resetSelectedSchedule = () => dispatch => {
  dispatch({ type: RESET_SELECTED_SCHEDULE });
};

const batchFirebaseWrite = (todosData, projectId) => {
  const batch = firebase.firestore().batch();
  todosData.map(t => {
    const todoDoc = firebase
      .firestore()
      .collection('projects')
      .doc(projectId)
      .collection('todos')
      .doc();
    batch.set(todoDoc, t);
    return true;
  });
  batch.commit().then(() => {
    console.log('syncing successful');
  });
};

const deleteAllTodos = (allTodos, projectId) => {
  const batch = firebase.firestore().batch();
  allTodos.map(at => {
    const todoDoc = firebase
      .firestore()
      .collection('projects')
      .doc(projectId)
      .collection('todos')
      .doc(at.id);
    batch.delete(todoDoc);
    return true;
  });
  batch.commit().then(() => {
    console.log('delete all docs successful');
  });
};

export const syncTimelineAndTask = (taskList, projectId) => () => {
  firebase
    .firestore()
    .collection('projects')
    .doc(projectId)
    .collection('todos')
    .get()
    .then(querySnapshot => {
      const rawTodo = querySnapshot.docs.map(doc => {
        const obj = doc.data();
        delete obj.id;
        return {
          id: doc.id,
          ...obj,
        };
      });

      if (!rawTodo.length) {
        batchFirebaseWrite(taskList, projectId);
      } else {
        const mergedTask = taskList.map(t => {
          const result = rawTodo.find(
            at => at.schedule_id === t.schedule_id && at.date === t.date,
          );
          if (!result) {
            return t;
          }
          return result;
        });

        deleteAllTodos(rawTodo, projectId);
        setTimeout(() => {
          batchFirebaseWrite(mergedTask, projectId);
        }, 4000);
      }
    });
};

export const fetchProfile = () => async dispatch => {
  try {
    dispatch({ type: FETCH_PROFILE.REQUEST });
    const { currentUser } = firebase.auth();
    let data = {
      ...initialState.profile,
      email: currentUser.email,
    };

    const profile = await firebase
      .firestore()
      .collection('users')
      .where('email', '==', currentUser.email)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          data = doc.data();
          data.id = doc.id;
        });
        return data;
      });

    dispatch({ type: FETCH_PROFILE.SUCCESS, profile });
    return profile;
  } catch (error) {
    dispatch({ type: FETCH_PROFILE.FAILURE });
    throw error;
  }
};
