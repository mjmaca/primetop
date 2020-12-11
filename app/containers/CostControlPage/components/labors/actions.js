/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
import firebase from 'firebase/app';
import { sortBy, isEmpty, padStart } from 'lodash';

import {
  FETCH_LABORS,
  ADD_LABOR,
  UPDATE_LABOR,
  SET_LABOR,
  RESET_LABOR,
} from './constants';

const fetchRecentLNo = async projectId => {
  const result = await firebase
    .firestore()
    .collection('projects')
    .doc(projectId)
    .collection('labors')
    .get();

  const l_numbers = result.docs.map(item => item.data().l_no);

  const exploded_l_numbers = sortBy(
    l_numbers.map(i => {
      const [rm, counter] = i.split('-');
      return { rm, counter };
    }),
    ['counter'],
  ).reverse();

  return !isEmpty(exploded_l_numbers)
    ? Number(exploded_l_numbers[0].counter) + 1
    : 1;
};

const formulateLNo = counter => `L-${padStart(counter, 4, '0')}`;

export const fetchLabors = projectId => async dispatch => {
  dispatch({ type: FETCH_LABORS.REQUEST });
  try {
    const result = await firebase
      .firestore()
      .collection('projects')
      .doc(projectId)
      .collection('labors')
      .orderBy('created_date', 'desc')
      .get();

    dispatch({
      type: FETCH_LABORS.SUCCESS,
      labors: result.docs.map(labor => ({
        id: labor.id,
        ...labor.data(),
      })),
    });
  } catch (error) {
    dispatch({ type: FETCH_LABORS.FAILURE });
    throw error;
  }
};

export const addLabor = (projectId, payload) => async dispatch => {
  dispatch({ type: ADD_LABOR.REQUEST });
  try {
    /** formulate PO Number */
    const counter = await fetchRecentLNo(projectId);
    payload.l_no = formulateLNo(counter);

    const newLabor = await firebase
      .firestore()
      .collection('projects')
      .doc(projectId)
      .collection('labors')
      .add(payload);

    payload.id = newLabor.id;

    dispatch({ type: ADD_LABOR.SUCCESS, payload });
  } catch (error) {
    dispatch({ type: ADD_LABOR.FAILURE });
    throw error;
  }
};

export const updateLabor = (projectId, payload) => async dispatch => {
  dispatch({ type: UPDATE_LABOR.REQUEST });
  try {
    await firebase
      .firestore()
      .collection('projects')
      .doc(projectId)
      .collection('labors')
      .doc(payload.id)
      .set(payload);

    dispatch({ type: UPDATE_LABOR.SUCCESS, payload });
  } catch (error) {
    dispatch({ type: UPDATE_LABOR.FAILURE });
    throw error;
  }
};

export const setLabor = labor => dispatch => {
  const { created_date, payment_date } = labor;

  dispatch({
    type: SET_LABOR,
    labor: {
      ...labor,
      created_date: created_date.toDate ? created_date.toDate() : created_date,
      // eslint-disable-next-line prettier/prettier
      payment_date: payment_date.toDate ? payment_date.toDate() : payment_date,
    },
  });
};

export const resetLabor = () => dispatch => {
  dispatch({ type: RESET_LABOR });
};
