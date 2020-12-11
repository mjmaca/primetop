/* eslint-disable camelcase */
import { isDate, isEmpty } from 'lodash';
import { createRequestState } from '../../../../helpers/request';
import { NAMESPACE } from '../../constants';

export const FETCH_REQUEST_MATERIALS = createRequestState(
  `${NAMESPACE}/FETCH_REQUEST_MATERIALS`,
);
export const ADD_REQUEST_MATERIAL = createRequestState(
  `${NAMESPACE}/ADD_REQUEST_MATERIAL`,
);
export const UPDATE_REQUEST_MATERIAL = createRequestState(
  `${NAMESPACE}/UPDATE_REQUEST_MATERIAL`,
);

export const SET_REQUEST_MATERIAL = `${NAMESPACE}/SET_REQUEST_MATERIAL`;
export const RESET_REQUEST_MATERIAL = `${NAMESPACE}/RESET_REQUEST_MATERIAL`;

export const INITIAL_STATE = {
  fetching: false,
  saving: false,
  requestMaterial: {
    items: [],
    attachments: [],
    delivery_date: null,
    comments: '',
  },
  requestMaterials: [],
};

export const REQUEST_MATERIAL_MODEL = {
  items: {
    validate: ({ items }) =>
      isEmpty(items) ? 'Order Items is required' : null,
  },
  created_date: {
    validate: ({ created_date }) =>
      !isDate(created_date) ? 'Document Date is required' : null,
  },
  delivery_date: {
    validate: ({ delivery_date }) =>
      !isDate(delivery_date) ? 'Delivery Date is required' : null,
  },
  status: {
    min: 1,
  },
};
