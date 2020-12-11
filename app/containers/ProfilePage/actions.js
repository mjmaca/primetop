/* eslint-disable camelcase */
/*
 *
 * ProfilePage actions
 *
 */
import firebase from 'firebase/app';

import { FETCH_PROFILE, UPDATE_PROFILE, UPLOAD_AVATAR } from './constants';
import { initialState } from './reducer';

export const fetchProfile = () => async dispatch => {
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
  } catch (error) {
    dispatch({ type: FETCH_PROFILE.FAILURE });
    throw error;
  }
};

export const updateProfile = profile => async dispatch => {
  try {
    const payload = { ...profile };
    const { id } = payload;

    dispatch({ type: UPDATE_PROFILE.REQUEST });

    /** if id is present, update the record. Otherwise, add new record */
    if (id) {
      await firebase
        .firestore()
        .collection('users')
        .doc(id)
        .update(payload);
    } else {
      const data = await firebase
        .firestore()
        .collection('users')
        .add(profile);

      payload.id = data.id;
    }

    dispatch({
      type: UPDATE_PROFILE.SUCCESS,
      profile: { ...payload },
    });
  } catch (error) {
    dispatch({ type: UPDATE_PROFILE.FAILURE });
    throw error;
  }
};

export const uploadAvatar = (id, file) => async dispatch => {
  dispatch({ type: UPLOAD_AVATAR.REQUEST });
  try {
    const storage = firebase.storage();
    const storageRef = storage.ref(`avatar/${id}/avatar`);
    const result = await storageRef.put(file);
    const avatar_url = await result.ref.getDownloadURL();
    dispatch({ type: UPLOAD_AVATAR.SUCCESS });
    updateProfile({ id, avatar: avatar_url })(dispatch);
  } catch (error) {
    dispatch({ type: UPLOAD_AVATAR.FAILURE });
    throw error;
  }
};
