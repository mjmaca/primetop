/* eslint-disable camelcase */
import { isDate, isEmpty } from 'lodash';
import { createRequestState } from '../../../../helpers/request';
import { NAMESPACE } from '../../constants';

export const FETCH_LABORS = createRequestState(`${NAMESPACE}/FETCH_LABORS`);
export const ADD_LABOR = createRequestState(`${NAMESPACE}/ADD_LABOR`);
export const UPDATE_LABOR = createRequestState(`${NAMESPACE}/UPDATE_LABOR`);

export const SET_LABOR = `${NAMESPACE}/SET_LABOR`;
export const RESET_LABOR = `${NAMESPACE}/RESET_LABOR`;

export const INITIAL_STATE = {
  fetching: false,
  saving: false,
  labor: {
    items: [],
    attachments: [],
    payment_date: null,
    comments: '',
  },
  labors: [],
};

export const LABOR_MODEL = {
  items: {
    validate: ({ items }) => (isEmpty(items) ? 'Personnel is required' : null),
  },
  created_date: {
    validate: ({ created_date }) =>
      !isDate(created_date) ? 'Document Date is required' : null,
  },
  payment_date: {
    validate: ({ payment_date }) =>
      !isDate(payment_date) ? 'Payment Date is required' : null,
  },
  status: {
    min: 1,
  },
};
