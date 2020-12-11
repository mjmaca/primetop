/*
 *
 * CostControl constants
 *
 */

export const NAMESPACE = 'COST_CONTROL';

export const SET_MODE = `${NAMESPACE}/SET_MODE`;
export const SET_PAGE = `${NAMESPACE}/SET_PAGE`;
export const SET_FILTER = `${NAMESPACE}/SET_FILTER`;

// eslint-disable-next-line prettier/prettier
export const MATERIAL_UNITS = ['bag', 'cm', 'cu. m.', 'ft', 'gal', 'kg', 'in', 'litre(s)', 'm', 'ml', 'mm', 'pc(s)', 'sq. m.', 'ton(s)', 'truck'];
export const EQUIPMENT_ACQUISITION_TYPE = ['buy', 'rent'];
export const EQUIPMENT_USAGE_UNIT = ['hour', 'day', 'week', 'month', 'year'];
// eslint-disable-next-line prettier/prettier
export const PERSONNEL_TYPE = ['regular', 'subcontract'];