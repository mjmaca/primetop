/* eslint-disable no-unused-expressions */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, useHistory } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

import Header from 'components/Header';

import AuthPage from 'containers/AuthPage/Loadable';
import LandingPage from 'containers/LandingPage/Loadable';
import VerifyPage from 'containers/VerifyPage/Loadable';
import ProjectPage from 'containers/ProjectPage/Loadable';
import SchedulePage from 'containers/SchedulePage/Loadable';
import ProfilePage from 'containers/ProfilePage/Loadable';
import OnboardPage from 'containers/OnboardPage/Loadable';
import CostControl from 'containers/CostControlPage/Loadable';
import FileUploadPage from 'containers/FileUploadPage/Loadable';
import ConversationPage from 'containers/ConversationPage/Loadable';
import SupplierListPage from 'containers/SupplierListPage/Loadable';
import ProjectMemberPage from 'containers/ProjectMemberPage/Loadable';
import OrganizationPage from 'containers/OrganizationPage/Loadable';
import ReportPage from 'containers/ReportPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import GlobalStyle from '../../global-styles';

import { fetchCurrectUser } from './actions';
import { NAMESPACE } from './constants';

function App(props) {
  const { fetching, fetchCurrectUser } = props;
  const history = useHistory();

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: 'AIzaSyDReod-3d-4osbPP1thuAxpI_ogHWb3n-Y',
        authDomain: 'primetop.firebaseapp.com',
        databaseURL: 'https://primetop.firebaseio.com',
        projectId: 'primetop',
        storageBucket: 'primetop.appspot.com',
        messagingSenderId: '593935576328',
        appId: '1:593935576328:web:0a20a8095377e99000d0bd',
        measurementId: 'G-SRFG6SQDPZ',
      });

      createSession();
    }
  }, []);

  async function createSession() {
    const {
      location: { pathname },
    } = history;

    const isSigninPage = pathname === '/signin';
    const isLandingPage = pathname === '/';

    try {
      await fetchCurrectUser();
      isSigninPage && history.push('/projects');
    } catch (error) {
      if (!isLandingPage && !isSigninPage) {
        history.push('/signin');
      }
    }
  }

  function Loading() {
    return <span>Loading...</span>;
  }

  function RenderComponent(Component) {
    return fetching ? (
      <Loading />
    ) : (
      <Fragment>
        <SnackbarProvider maxSnack={3}>
          <Header />
          <Component />
        </SnackbarProvider>
      </Fragment>
    );
  }

  return (
    <div>
      <Switch>
        <Route exact path="/" component={() => <LandingPage />} />
        <Route exact path="/signin" component={() => <AuthPage />} />
        <Route
          exact
          path="/projects"
          component={() => RenderComponent(ProjectPage)}
        />
        <Route
          exact
          path="/verify"
          component={() => RenderComponent(VerifyPage)}
        />
        <Route
          exact
          path="/schedule/:projectId"
          component={() => RenderComponent(SchedulePage)}
        />
        <Route
          exact
          path="/profile"
          component={() => RenderComponent(ProfilePage)}
        />
        <Route
          exact
          path="/onboard"
          component={() => RenderComponent(OnboardPage)}
        />
        <Route
          exact
          path="/cost_control/:projectId"
          component={() => RenderComponent(CostControl)}
        />
        <Route
          exact
          path="/files/:projectId"
          component={() => RenderComponent(FileUploadPage)}
        />
        <Route
          exact
          path="/chat/:projectId"
          component={() => RenderComponent(ConversationPage)}
        />
        <Route
          exact
          path="/supplierlist/:projectId"
          component={() => RenderComponent(SupplierListPage)}
        />
        <Route
          exact
          path="/members/:projectId"
          component={() => RenderComponent(ProjectMemberPage)}
        />
        <Route
          exact
          path="/organization/:projectId"
          component={() => RenderComponent(OrganizationPage)}
        />
        <Route
          exact
          path="/reports/:projectId"
          component={() => RenderComponent(ReportPage)}
        />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}

const mapStateToProps = state => {
  const {
    [NAMESPACE]: { fetching },
  } = state;

  return {
    fetching,
  };
};

export default connect(
  mapStateToProps,
  { fetchCurrectUser },
)(App);
