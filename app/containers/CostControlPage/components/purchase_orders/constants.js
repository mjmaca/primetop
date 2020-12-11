/* eslint-disable camelcase */
import { isDate, isEmpty } from 'lodash';
import { createRequestState } from '../../../../helpers/request';
import { NAMESPACE } from '../../constants';

export const FETCH_PURCHASE_ORDERS = createRequestState(
  `${NAMESPACE}/FETCH_PURCHASE_ORDERS`,
);
export const ADD_PURCHASE_ORDER = createRequestState(
  `${NAMESPACE}/ADD_PURCHASE_ORDER`,
);
export const UPDATE_PURCHASE_ORDER = createRequestState(
  `${NAMESPACE}/UPDATE_PURCHASE_ORDER`,
);
export const DELETE_PURCHASE_ORDER = createRequestState(
  `${NAMESPACE}/DELETE_PURCHASE_ORDER`,
);

export const SET_PURCHASE_ORDER = `${NAMESPACE}/SET_PURCHASE_ORDER`;
export const RESET_PURCHASE_ORDER = `${NAMESPACE}/RESET_PURCHASE_ORDER`;

export const INITIAL_STATE = {
  fetching: false,
  saving: false,
  purchaseOrder: {
    supplier: {
      name: '',
      province: '',
      city: '',
      street: '',
      zip: '',
      contact_person: '',
      contact_number: '',
    },
    delivery: {
      name: '',
      province: '',
      city: '',
      street: '',
      zip: '',
      contact_person: '',
      contact_number: '',
    },
    items: [],
    attachments: [],
    delivery_date: null,
    payment_method: 'cash',
    payment_terms: '',
    comments: '',
  },
  purchaseOrders: [],
};

export const PAYMENT_METHODS = ['cash', 'check', 'cod', 'credit'];

export const PURCHASE_ORDER_MODEL = {
  supplier: {
    name: {
      min: 1,
    },
    province: {
      min: 1,
    },
    city: {
      min: 1,
    },
    contact_person: {
      min: 1,
    },
    contact_number: {
      min: 1,
    },
  },
  delivery: {
    province: {
      min: 1,
    },
    city: {
      min: 1,
    },
    contact_person: {
      min: 1,
    },
    contact_number: {
      min: 1,
    },
  },
  items: {
    validate: ({ items }) =>
      isEmpty(items) ? 'Order Items is required' : null,
  },
  sub_total: {
    validate: ({ sub_total }) => (!sub_total ? 'Total is invalid' : null),
  },
  grand_total: {
    validate: ({ grand_total }) => (!grand_total ? 'Total is invalid' : null),
  },
  payment_method: {
    min: 1,
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
