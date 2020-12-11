/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
import firebase from 'firebase/app';
import { sortBy, isEmpty, padStart } from 'lodash';

import {
  FETCH_REQUEST_MATERIALS,
  ADD_REQUEST_MATERIAL,
  UPDATE_REQUEST_MATERIAL,
  SET_REQUEST_MATERIAL,
  RESET_REQUEST_MATERIAL,
} from './constants';

const fetchRecentRMNo = async projectId => {
  const result = await firebase
    .firestore()
    .collection('projects')
    .doc(projectId)
    .collection('request_materials')
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

const formulateRMNo = counter => `RM-${padStart(counter, 4, '0')}`;

export const fetchRequestMaterials = projectId => async dispatch => {
  dispatch({ type: FETCH_REQUEST_MATERIALS.REQUEST });
  try {
    const result = await firebase
      .firestore()
      .collection('projects')
      .doc(projectId)
      .collection('request_materials')
      .orderBy('created_date', 'desc')
      .get();

    dispatch({
      type: FETCH_REQUEST_MATERIALS.SUCCESS,
      requestMaterials: result.docs.map(requestMaterial => ({
        id: requestMaterial.id,
        ...requestMaterial.data(),
      })),
    });
  } catch (error) {
    dispatch({ type: FETCH_REQUEST_MATERIALS.FAILURE });
    throw error;
  }
};

export const addRequestMaterial = (projectId, payload) => async dispatch => {
  dispatch({ type: ADD_REQUEST_MATERIAL.REQUEST });
  try {
    /** formulate PO Number */
    const counter = await fetchRecentRMNo(projectId);
    payload.rm_no = formulateRMNo(counter);

    const newRequestMaterial = await firebase
      .firestore()
      .collection('projects')
      .doc(projectId)
      .collection('request_materials')
      .add(payload);

    payload.id = newRequestMaterial.id;

    dispatch({ type: ADD_REQUEST_MATERIAL.SUCCESS, payload });
  } catch (error) {
    dispatch({ type: ADD_REQUEST_MATERIAL.FAILURE });
    throw error;
  }
};

export const updateRequestMaterial = (projectId, payload) => async dispatch => {
  dispatch({ type: UPDATE_REQUEST_MATERIAL.REQUEST });
  try {
    await firebase
      .firestore()
      .collection('projects')
      .doc(projectId)
      .collection('request_materials')
      .doc(payload.id)
      .set(payload);

    dispatch({ type: UPDATE_REQUEST_MATERIAL.SUCCESS, payload });
  } catch (error) {
    dispatch({ type: UPDATE_REQUEST_MATERIAL.FAILURE });
    throw error;
  }
};

export const setRequestMaterial = requestMaterial => dispatch => {
  const { created_date, delivery_date } = requestMaterial;

  dispatch({
    type: SET_REQUEST_MATERIAL,
    requestMaterial: {
      ...requestMaterial,
      created_date: created_date.toDate ? created_date.toDate() : created_date,
      // eslint-disable-next-line prettier/prettier
      delivery_date: delivery_date.toDate ? delivery_date.toDate() : delivery_date,
    },
  });
};

export const resetRequestMaterial = () => dispatch => {
  dispatch({ type: RESET_REQUEST_MATERIAL });
};
