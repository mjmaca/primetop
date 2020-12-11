import firebase from 'firebase/app';

import { SIGN_IN, SIGN_UP, CHANGE_MODE, RESET_PASSWORD } from './constants';

export const setMode = mode => dispatch => {
  dispatch({ type: CHANGE_MODE, mode });
};

export const signInWithEmailAndPassword = ({
  email,
  password,
}) => async dispatch => {
  dispatch({ type: SIGN_IN.REQUEST });
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    dispatch({ type: SIGN_IN.SUCCESS });
    return true;
  } catch (error) {
    dispatch({ type: SIGN_IN.FAILURE });
    throw error;
  }
};

export const createUserWithEmailAndPassword = ({
  email,
  password,
}) => async dispatch => {
  dispatch({ type: SIGN_UP.REQUEST });
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    await firebase.auth().currentUser.sendEmailVerification();
    dispatch({ type: SIGN_UP.SUCCESS });
    return true;
  } catch (error) {
    dispatch({ type: SIGN_UP.FAILURE });
    throw error;
  }
};

export const sendPasswordResetEmail = email => async dispatch => {
  dispatch({ type: RESET_PASSWORD.REQUEST });
  try {
    await firebase.auth().sendPasswordResetEmail(email);
    dispatch({ type: RESET_PASSWORD.SUCCESS });
    return true;
  } catch (error) {
    dispatch({ type: RESET_PASSWORD.FAILURE });
    throw error;
  }
};
