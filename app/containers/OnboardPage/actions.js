/*
 *
 * Onboard actions
 *
 */
import firebase from 'firebase/app';
import {
  DEFAULT_ACTION,
  CREATE_COMPANY,
  CREATE_USER,
  GET_COMPANY,
  UPDATE_COMPANY,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export const createCompanyAction = data => async dispatch => {
  dispatch({ type: CREATE_COMPANY.REQUEST });
  let result;
  try {
    await firebase
      .firestore()
      .collection('companies')
      .add(data)
      .then(res => {
        result = res;
      });
    dispatch({ type: CREATE_COMPANY.SUCCESS });
    return result;
  } catch (error) {
    dispatch({ type: CREATE_COMPANY.FAILURE });
    throw error;
  }
};

export const createUserAction = profile => async dispatch => {
  dispatch({ type: CREATE_USER.REQUEST });
  try {
    await firebase
      .firestore()
      .collection('users')
      .doc(profile.id)
      .set(profile)
      .then(() => {
        console.log('Success creating an account: ');
      })
      .catch(error => {
        console.error('Error writing document: ', error);
      });
    dispatch({ type: CREATE_USER.SUCCESS });
    return;
  } catch (error) {
    dispatch({ type: CREATE_USER.FAILURE });
    throw error;
  }
};

export const getCompanyByCodeAction = codeNumber => async dispatch => {
  dispatch({ type: GET_COMPANY.REQUEST });
  let result;
  try {
    await firebase
      .firestore()
      .collection('companies')
      .where('code_number', '==', codeNumber)
      .get()
      .then(querySnapshot => {
        result = [...querySnapshot.docs];
      });
    dispatch({ type: GET_COMPANY.SUCCESS });
    return result;
  } catch (error) {
    dispatch({ type: GET_COMPANY.FAILURE });
    throw error;
  }
};

export const updateCompanyByCodeAction = (
  companyId,
  payload,
) => async dispatch => {
  dispatch({ type: UPDATE_COMPANY.REQUEST });
  let result;
  try {
    await firebase
      .firestore()
      .collection('companies')
      .doc(companyId)
      .set(payload, { merge: true })
      .then(res => {
        result = res;
      });
    dispatch({ type: UPDATE_COMPANY.SUCCESS });
    return result;
  } catch (error) {
    dispatch({ type: UPDATE_COMPANY.FAILURE });
    throw error;
  }
};
