/*
 *
 * ProjectPage actions
 *
 */
import firebase from 'firebase/app';

import { FETCH_PROJECT, FETCH_PROFILE, DEFAULT_ACTION } from './constants';

import { initialState } from './reducer';
export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export const fetchProject = projectId => async dispatch => {
  dispatch({ type: FETCH_PROJECT.REQUEST });
  try {
    const project = await firebase
      .firestore()
      .collection('projects')
      .doc(projectId)
      .get();

    dispatch({
      type: FETCH_PROJECT.SUCCESS,
      project: { id: project.id, ...project.data() },
    });
  } catch (error) {
    dispatch({ type: FETCH_PROJECT.FAILURE });
    throw error;
  }
};

export const fetchProfileAction = () => async dispatch => {
  try {
    dispatch({ type: FETCH_PROFILE.REQUEST });
    const { currentUser } = firebase.auth();
    let data = {
      ...initialState.profile,
      email: currentUser.email,
    };

    const profile = await firebase
      .firestore()
      .collection('users')
      .where('email', '==', currentUser.email)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          data = doc.data();
          data.id = doc.id;
        });
        return data;
      });

    dispatch({ type: FETCH_PROFILE.SUCCESS, profile });
    return profile;
  } catch (error) {
    dispatch({ type: FETCH_PROFILE.FAILURE });
    throw error;
  }
};
