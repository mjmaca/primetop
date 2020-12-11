/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
import firebase from 'firebase/app';
import { sortBy, isEmpty, padStart } from 'lodash';

import {
  FETCH_PURCHASE_ORDERS,
  ADD_PURCHASE_ORDER,
  UPDATE_PURCHASE_ORDER,
  SET_PURCHASE_ORDER,
  RESET_PURCHASE_ORDER,
  DELETE_PURCHASE_ORDER,
} from './constants';

const fetchRecentPONo = async projectId => {
  const result = await firebase
    .firestore()
    .collection('projects')
    .doc(projectId)
    .collection('purchase_orders')
    .get();

  const po_numbers = result.docs.map(
    purchaseOrder => purchaseOrder.data().po_no,
  );

  const exploded_po_numbers = sortBy(
    po_numbers.map(i => {
      const [po, counter] = i.split('-');
      return { po, counter };
    }),
    ['counter'],
  ).reverse();

  return !isEmpty(exploded_po_numbers)
    ? Number(exploded_po_numbers[0].counter) + 1
    : 1;
};

const formulatePONo = counter => `PO-${padStart(counter, 4, '0')}`;

export const fetchPurchaseOrders = projectId => async dispatch => {
  dispatch({ type: FETCH_PURCHASE_ORDERS.REQUEST });
  try {
    const result = await firebase
      .firestore()
      .collection('projects')
      .doc(projectId)
      .collection('purchase_orders')
      .where('status', 'in', ['pending', 'approved'])
      .orderBy('created_date', 'desc')
      .get();

    dispatch({
      type: FETCH_PURCHASE_ORDERS.SUCCESS,
      purchaseOrders: result.docs.map(purchaseOrder => ({
        id: purchaseOrder.id,
        ...purchaseOrder.data(),
      })),
    });
  } catch (error) {
    dispatch({ type: FETCH_PURCHASE_ORDERS.FAILURE });
    throw error;
  }
};

export const addPurchaseOrder = (projectId, payload) => async dispatch => {
  dispatch({ type: ADD_PURCHASE_ORDER.REQUEST });
  try {
    /** formulate PO Number */
    const counter = await fetchRecentPONo(projectId);
    payload.po_no = formulatePONo(counter);

    const newPurchaseOrder = await firebase
      .firestore()
      .collection('projects')
      .doc(projectId)
      .collection('purchase_orders')
      .add(payload);

    payload.id = newPurchaseOrder.id;

    dispatch({ type: ADD_PURCHASE_ORDER.SUCCESS, payload });
  } catch (error) {
    dispatch({ type: ADD_PURCHASE_ORDER.FAILURE });
    throw error;
  }
};

export const updatePurchaseOrder = (projectId, payload) => async dispatch => {
  dispatch({ type: UPDATE_PURCHASE_ORDER.REQUEST });
  try {
    await firebase
      .firestore()
      .collection('projects')
      .doc(projectId)
      .collection('purchase_orders')
      .doc(payload.id)
      .set(payload);

    dispatch({ type: UPDATE_PURCHASE_ORDER.SUCCESS, payload });
  } catch (error) {
    dispatch({ type: UPDATE_PURCHASE_ORDER.FAILURE });
    throw error;
  }
};

export const setPurchaseOrder = purchaseOrder => dispatch => {
  const { created_date, delivery_date } = purchaseOrder;

  dispatch({
    type: SET_PURCHASE_ORDER,
    purchaseOrder: {
      ...purchaseOrder,
      created_date: created_date.toDate ? created_date.toDate() : created_date,
      // eslint-disable-next-line prettier/prettier
      delivery_date: delivery_date.toDate ? delivery_date.toDate() : delivery_date,
    },
  });
};

export const resetPurchaseOrder = () => dispatch => {
  dispatch({ type: RESET_PURCHASE_ORDER });
};

export const deletePurchaseOrder = (projectId, payload) => async dispatch => {
  dispatch({ type: DELETE_PURCHASE_ORDER.REQUEST });
  try {
    await firebase
      .firestore()
      .collection('projects')
      .doc(projectId)
      .collection('purchase_orders')
      .doc(payload.id)
      .set(payload);

    dispatch({ type: DELETE_PURCHASE_ORDER.SUCCESS, payload });
  } catch (error) {
    dispatch({ type: DELETE_PURCHASE_ORDER.FAILURE });
    throw error;
  }
};
