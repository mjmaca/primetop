/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
export const getTotalEstimates = estimates =>
  estimates
    .map(({ material_cost, labor_cost, equipment_cost }) =>
      [...material_cost, ...labor_cost, ...equipment_cost]
        .map(({ amount }) => amount)
        .reduce((total, amount) => (total += amount), 0),
    )
    .reduce((total, amount) => (total += amount), 0);

export const getTotalReceivedMaterials = receivedMaterials =>
  receivedMaterials
    .map(({ grand_total }) => grand_total)
    .reduce((total, amount) => (total += amount), 0);

export const getTotalLabors = labors =>
  labors
    .map(({ grand_total }) => grand_total)
    .reduce((total, amount) => (total += amount), 0);
