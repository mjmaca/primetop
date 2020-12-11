/* eslint-disable camelcase */
import { isDate, isEmpty } from 'lodash';
import { createRequestState } from '../../../../helpers/request';
import { NAMESPACE } from '../../constants';

export const FETCH_RECEIVED_MATERIALS = createRequestState(
  `${NAMESPACE}/FETCH_RECEIVED_MATERIALS`,
);
export const ADD_RECEIVED_MATERIAL = createRequestState(
  `${NAMESPACE}/ADD_RECEIVED_MATERIAL`,
);
export const UPDATE_RECEIVED_MATERIAL = createRequestState(
  `${NAMESPACE}/UPDATE_RECEIVED_MATERIAL`,
);

export const SET_RECEIVED_MATERIAL = `${NAMESPACE}/SET_RECEIVED_MATERIAL`;
export const RESET_RECEIVED_MATERIAL = `${NAMESPACE}/RESET_RECEIVED_MATERIAL`;

export const INITIAL_STATE = {
  fetching: false,
  saving: false,
  receivedMaterial: {
    items: [],
    attachments: [],
    delivery_date: null,
    comments: '',
  },
  receivedMaterials: [],
};

export const RECEIVED_MATERIAL_MODEL = {
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
