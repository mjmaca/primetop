/* eslint-disable camelcase */
import { createRequestState } from '../../../../helpers/request';
import { NAMESPACE } from '../../constants';

export const INITIAL_STATE = {
  fetching: false,
  saving: false,
  costEstimate: {}, // it can be an item of material_cost, labor_cost, equipment_cost
  costEstimates: {
    material_cost: [],
    labor_cost: [],
    equipment_cost: [],
  },
  estimates: [],
};

export const FETCH_COST_ESTIMATES = createRequestState(
  `${NAMESPACE}/FETCH_COST_ESTIMATES`,
);
export const FETCH_ESTIMATES = createRequestState(
  `${NAMESPACE}/FETCH_ESTIMATES`,
);
export const UPDATE_COST_ESTIMATES = createRequestState(
  `${NAMESPACE}/UPDATE_COST_ESTIMATES`,
);

export const SET_COST_ESTIMATE = `${NAMESPACE}/SET_COST_ESTIMATE`;

export const MATERIAL_COST_COLUMNS = [
  { dataKey: 'name', label: 'Name' },
  { dataKey: 'description', label: 'Description' },
  { dataKey: 'quantity', label: 'Quantity', cellProps: { align: 'center' } },
  { dataKey: 'unit', label: 'Unit of Measure', cellProps: { align: 'center' } },
  {
    dataKey: 'price_per_unit',
    label: 'Price per Unit',
    cellProps: { align: 'center' },
  },
  { dataKey: 'amount', label: 'Amount', cellProps: { align: 'center' } },
];

export const LABOR_COST_COLUMNS = [
  { dataKey: 'personnel', label: 'Personnel' },
  { dataKey: 'type', label: 'Type' },
  {
    dataKey: 'quantity',
    label: '# of Personnel',
    cellProps: { align: 'center' },
  },
  {
    dataKey: 'working_days',
    label: 'Working Days',
    cellProps: { align: 'center' },
  },
  {
    dataKey: 'rate',
    label: 'Rate per Day / Cotract Cost',
    cellProps: { align: 'center' },
  },
  { dataKey: 'amount', label: 'Amount', cellProps: { align: 'center' } },
];

export const EQUIPMENT_COST_COLUMNS = [
  { dataKey: 'name', label: 'Name' },
  { dataKey: 'acquisition_type', label: 'Acquisition Type' },
  { dataKey: 'quantity', label: 'Quantity', cellProps: { align: 'center' } },
  { dataKey: 'usage', label: 'Usage', cellProps: { align: 'center' } },
  {
    dataKey: 'price_per_unit',
    label: 'Item Price/Rate',
    cellProps: { align: 'center' },
  },
  { dataKey: 'amount', label: 'Amount', cellProps: { align: 'center' } },
];

export const EXPANSION_PANEL = [
  {
    key: 'material_cost',
    COLUMNS: MATERIAL_COST_COLUMNS,
    label: 'Material Cost',
  },
  {
    key: 'labor_cost',
    COLUMNS: LABOR_COST_COLUMNS,
    label: 'Labor Cost',
  },
  {
    key: 'equipment_cost',
    COLUMNS: EQUIPMENT_COST_COLUMNS,
    label: 'Equipment Cost',
  },
];

export const MATERIAL_COST_MODEL = {
  name: {
    min: 1,
  },
  quantity: {
    validate: data => {
      const { quantity = 0 } = data;

      return !quantity ? 'Quantity is required' : null;
    },
  },
  unit: {
    min: 1,
  },
  price_per_unit: {
    validate: data => {
      const { price_per_unit } = data;

      return !price_per_unit ? 'Price is required' : null;
    },
  },
  amount: {
    validate: data => {
      const { amount } = data;

      return !amount ? 'Amount is required' : null;
    },
  },
};

export const LABOR_COST_MODEL = {
  personnel: {
    min: 1,
  },
  type: {
    min: 1,
  },
  quantity: {
    validate: data => {
      const { quantity = 0, type = '' } = data;

      return type === 'Regular' && !quantity ? '# of worker is required' : null;
    },
  },
  rate: {
    validate: data => {
      const { rate = 0, type = '' } = data;

      return type === 'Regular' && !rate ? 'Rate is required' : null;
    },
  },
  working_days: {
    validate: data => {
      const { working_days = 0, type = '' } = data;

      return type === 'Regular' && !working_days
        ? 'Working days is required'
        : null;
    },
  },
  amount: {
    validate: data => {
      const { amount } = data;

      return !amount ? 'Amount is required' : null;
    },
  },
};

export const EQUIPMENT_COST_MODEL = {
  name: {
    min: 1,
  },
  acquisition_type: {
    min: 1,
  },
  quantity: {
    validate: data => {
      const { quantity = 0 } = data;

      return !quantity ? 'Quantity is required' : null;
    },
  },
  usage: {
    validate: data => {
      const { usage, acquisition_type } = data;

      return !usage && acquisition_type === 'rent' ? 'Usage is required' : null;
    },
  },
  unit: {
    validate: data => {
      const { unit, acquisition_type } = data;

      return !unit && acquisition_type === 'rent'
        ? 'Usage span is required'
        : null;
    },
  },
  price_per_unit: {
    validate: data => {
      const { price_per_unit } = data;

      return !price_per_unit ? 'Price is required' : null;
    },
  },
  amount: {
    validate: data => {
      const { amount } = data;

      return !amount ? 'Amount is required' : null;
    },
  },
};
