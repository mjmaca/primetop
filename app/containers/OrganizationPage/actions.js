/*
 *
 * OrganizationPage actions
 *
 */
import firebase from 'firebase/app';

import {
  FETCH_COMPANY,
  FETCH_COMPANY_MEMBERS,
  UPDATE_COMPANY,
  UPDATE_USER_ROLE,
} from './constants';

export const fetchCompany = () => async dispatch => {
  dispatch({ type: FETCH_COMPANY.REQUEST });
  try {
    const { currentUser } = firebase.auth();
    const profile = await firebase
      .firestore()
      .collection('users')
      .where('email', '==', currentUser.email)
      .get()
      .then(results => {
        const doc = results.docs[0];
        return doc ? { id: doc.id, ...doc.data() } : {};
      });

    const company = await firebase
      .firestore()
      .collection('companies')
      .where('name', '==', profile.company)
      .get()
      .then(results => {
        const doc = results.docs[0];
        return doc ? { id: doc.id, ...doc.data() } : {};
      });

    const owner = await firebase
      .firestore()
      .collection('users')
      .where('email', '==', company.owner)
      .get()
      .then(results => {
        const doc = results.docs[0];
        return doc ? { id: doc.id, ...doc.data() } : {};
      });

    /**
     * Company name is tied up in most of our queries.
     * It is too late to bind with id which is the right way.
     * But since we don't have migration, we will treat company name
     * as the company id. This is unique and non editable.
     * If the user wants to change the company name, we will save it in
     * display_name.
     */
    company.display_name = company.display_name || company.name;

    dispatch({ type: FETCH_COMPANY.SUCCESS, company, owner });
    return company;
  } catch (error) {
    dispatch({ type: FETCH_COMPANY.FAILURE });
    throw error;
  }
};

export const fetchCompanyMembers = ids => async dispatch => {
  dispatch({ type: FETCH_COMPANY_MEMBERS.REQUEST });
  try {
    const members = await firebase
      .firestore()
      .collection('users')
      .where(firebase.firestore.FieldPath.documentId(), 'in', ids)
      .get()
      .then(results =>
        results.docs.map(doc => ({ id: doc.id, ...doc.data() })),
      );

    dispatch({ type: FETCH_COMPANY_MEMBERS.SUCCESS, members });
  } catch (error) {
    dispatch({ type: FETCH_COMPANY_MEMBERS.FAILURE });
    throw error;
  }
};

export const updateCompany = payload => async dispatch => {
  dispatch({ type: UPDATE_COMPANY.REQUEST });
  try {
    const { id, ...data } = payload;

    await firebase
      .firestore()
      .collection('companies')
      .doc(id)
      .update(data);

    dispatch({ type: UPDATE_COMPANY.SUCCESS, company: payload });
  } catch (error) {
    dispatch({ type: UPDATE_COMPANY.FAILURE });
    throw error;
  }
};

export const updateUser = (id, position) => async dispatch => {
  dispatch({ type: UPDATE_USER_ROLE.REQUEST });
  try {
    await firebase
      .firestore()
      .collection('users')
      .doc(id)
      .set(
        {
          position,
        },
        { merge: true },
      );

    dispatch({ type: UPDATE_USER_ROLE.SUCCESS });
  } catch (error) {
    dispatch({ type: UPDATE_USER_ROLE.FAILURE });
    throw error;
  }
};
