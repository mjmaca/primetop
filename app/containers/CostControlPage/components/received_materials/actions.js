/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
import firebase from 'firebase/app';
import { sortBy, isEmpty, padStart } from 'lodash';

import {
  FETCH_RECEIVED_MATERIALS,
  ADD_RECEIVED_MATERIAL,
  UPDATE_RECEIVED_MATERIAL,
  SET_RECEIVED_MATERIAL,
  RESET_RECEIVED_MATERIAL,
} from './constants';

const fetchRecentRMNo = async projectId => {
  const result = await firebase
    .firestore()
    .collection('projects')
    .doc(projectId)
    .collection('received_materials')
    .get();

  const rm_numbers = result.docs.map(item => item.data().rm_no);

  const exploded_rm_numbers = sortBy(
    rm_numbers.map(i => {
      const [rm, counter] = i.split('-');
      return { rm, counter };
    }),
    ['counter'],
  ).reverse();

  return !isEmpty(exploded_rm_numbers)
    ? Number(exploded_rm_numbers[0].counter) + 1
    : 1;
};

const formulateRMNo = counter => `OM-${padStart(counter, 4, '0')}`;

export const fetchReceivedMaterials = projectId => async dispatch => {
  dispatch({ type: FETCH_RECEIVED_MATERIALS.REQUEST });
  try {
    const result = await firebase
      .firestore()
      .collection('projects')
      .doc(projectId)
      .collection('received_materials')
      .orderBy('created_date', 'desc')
      .get();

    dispatch({
      type: FETCH_RECEIVED_MATERIALS.SUCCESS,
      receivedMaterials: result.docs.map(receivedMaterial => ({
        id: receivedMaterial.id,
        ...receivedMaterial.data(),
      })),
    });
  } catch (error) {
    dispatch({ type: FETCH_RECEIVED_MATERIALS.FAILURE });
    throw error;
  }
};

export const addReceivedMaterial = (projectId, payload) => async dispatch => {
  dispatch({ type: ADD_RECEIVED_MATERIAL.REQUEST });
  try {
    /** formulate PO Number */
    const counter = await fetchRecentRMNo(projectId);
    payload.rm_no = formulateRMNo(counter);

    const newReceivedMaterial = await firebase
      .firestore()
      .collection('projects')
      .doc(projectId)
      .collection('received_materials')
      .add(payload);

    payload.id = newReceivedMaterial.id;

    dispatch({ type: ADD_RECEIVED_MATERIAL.SUCCESS, payload });
  } catch (error) {
    dispatch({ type: ADD_RECEIVED_MATERIAL.FAILURE });
    throw error;
  }
};

export const updateReceivedMaterial = (
  projectId,
  payload,
) => async dispatch => {
  dispatch({ type: UPDATE_RECEIVED_MATERIAL.REQUEST });
  try {
    await firebase
      .firestore()
      .collection('projects')
      .doc(projectId)
      .collection('received_materials')
      .doc(payload.id)
      .set(payload);

    dispatch({ type: UPDATE_RECEIVED_MATERIAL.SUCCESS, payload });
  } catch (error) {
    dispatch({ type: UPDATE_RECEIVED_MATERIAL.FAILURE });
    throw error;
  }
};

export const setReceivedMaterial = receivedMaterial => dispatch => {
  const { created_date, delivery_date } = receivedMaterial;

  dispatch({
    type: SET_RECEIVED_MATERIAL,
    receivedMaterial: {
      ...receivedMaterial,
      created_date: created_date.toDate ? created_date.toDate() : created_date,
      // eslint-disable-next-line prettier/prettier
      delivery_date: delivery_date.toDate ? delivery_date.toDate() : delivery_date,
    },
  });
};

export const resetReceivedMaterial = () => dispatch => {
  dispatch({ type: RESET_RECEIVED_MATERIAL });
};
