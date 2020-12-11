import firebase from 'firebase/app';
import { FETCH_CURRENT_USER } from './constants';

export const fetchCurrectUser = () => dispatch => {
  dispatch({ type: FETCH_CURRENT_USER.REQUEST });
  try {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(currentUser => {
        if (currentUser) {
          resolve();
        } else {
          reject(new Error('User is not logged in'));
        }
        dispatch({ type: FETCH_CURRENT_USER.SUCCESS, currentUser });
      });
    });
  } catch (error) {
    dispatch({ type: FETCH_CURRENT_USER.FAILURE });
    throw error;
  }
};
