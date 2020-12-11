import firebase from 'firebase/app';

import generateId from '../../../../helpers/generateId';

import { NAMESPACE } from '../../constants';
import {
  FETCH_COST_ESTIMATES,
  SET_COST_ESTIMATE,
  UPDATE_COST_ESTIMATES,
  FETCH_ESTIMATES,
} from './constants';

export const fetchCostEstimates = (projectId, scheduleId) => async dispatch => {
  dispatch({ type: FETCH_COST_ESTIMATES.REQUEST });
  try {
    const costEstimates = await firebase
      .firestore()
      .collection('projects')
      .doc(projectId)
      .collection('cost_estimates')
      .where('schedule_id', '==', scheduleId)
      .get();

    if (costEstimates.docs.length) {
      const doc = costEstimates.docs[0];

      dispatch({
        type: FETCH_COST_ESTIMATES.SUCCESS,
        costEstimates: { id: doc.id, ...doc.data() },
      });
    } else {
      /** if cost estimates is not in the database yet, reset the costEstimates */
      dispatch({
        type: FETCH_COST_ESTIMATES.SUCCESS,
        costEstimates: {
          material_cost: [],
          labor_cost: [],
          equipment_cost: [],
        },
      });
    }
  } catch (error) {
    dispatch({ type: FETCH_COST_ESTIMATES.FAILURE });
    throw error;
  }
};

/**
 *
 * @param {object} costEstimate it can be an item of material_cost, labor_cost, equipment_cost
 */
export const setCostEstimate = costEstimate => dispatch => {
  dispatch({ type: SET_COST_ESTIMATE, costEstimate });
};

/**
 *
 * @param {string} table material_cost, labor_cost, equipment_cost
 * @param {string} mode, add or edit
 * @param {object} payload look for example in reducer
 */
export const updateCostEstimates = ({
  table,
  mode,
  payload,
  projectId,
  scheduleId,
}) => async (dispatch, getState) => {
  const {
    [NAMESPACE]: {
      costEstimates: { costEstimates },
    },
  } = getState();
  const { id: costEstimatesId } = costEstimates;

  dispatch({ type: UPDATE_COST_ESTIMATES.REQUEST });
  try {
    // eslint-disable-next-line default-case
    switch (mode) {
      case 'add':
        costEstimates[table].push({ id: generateId(), ...payload });
        break;
      case 'edit': {
        const index = costEstimates[table].findIndex(
          ({ id }) => id === payload.id,
        );

        costEstimates[table] = [
          ...costEstimates[table].slice(0, index),
          { ...payload },
          ...costEstimates[table].slice(index + 1),
        ];
        break;
      }
      case 'delete': {
        const index = costEstimates[table].findIndex(
          ({ id }) => id === payload.id,
        );

        costEstimates[table] = [
          ...costEstimates[table].slice(0, index),
          ...costEstimates[table].slice(index + 1),
        ];
        break;
      }
    }

    if (costEstimatesId) {
      // update
      await firebase
        .firestore()
        .collection('projects')
        .doc(projectId)
        .collection('cost_estimates')
        .doc(costEstimatesId)
        .set(costEstimates);
    } else {
      // add
      const newCostEstimates = await firebase
        .firestore()
        .collection('projects')
        .doc(projectId)
        .collection('cost_estimates')
        .add({ schedule_id: scheduleId, ...costEstimates });

      // eslint-disable-next-line prefer-destructuring
      costEstimates.id = newCostEstimates.id;
      costEstimates.schedule_id = scheduleId;
    }

    dispatch({ type: UPDATE_COST_ESTIMATES.SUCCESS, costEstimates });
    return costEstimates;
  } catch (error) {
    dispatch({ type: UPDATE_COST_ESTIMATES.FAILURE });
    throw error;
  }
};

/**
 *
 * @param {string} projectId
 */
export const fetchEstimates = projectId => async dispatch => {
  dispatch({ type: FETCH_ESTIMATES.REQUEST });
  try {
    const estimates = await firebase
      .firestore()
      .collection('projects')
      .doc(projectId)
      .collection('cost_estimates')
      .get();

    dispatch({
      type: FETCH_ESTIMATES.SUCCESS,
      estimates: estimates.docs.map(estimate => ({
        id: estimates.id,
        ...estimate.data(),
      })),
    });
  } catch (error) {
    dispatch({ type: FETCH_ESTIMATES.FAILURE });
    throw error;
  }
};
