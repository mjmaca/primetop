/**
 *
 * ConversationPage
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Grid } from '@material-ui/core';
import Sidebar from 'components/Sidebar';
import Conversation from 'components/Conversation';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectConversationPage from './selectors';
import reducer from './reducer';
import saga from './saga';

export function ConversationPage() {
  useInjectReducer({ key: 'conversationPage', reducer });
  useInjectSaga({ key: 'conversationPage', saga });

  return (
    <Grid
      container
      style={{ height: 'calc(100vh - 64px)', flexWrap: 'nowrap' }}
    >
      <Grid>
        <Sidebar />
      </Grid>
      <Grid style={{ flexGrow: 1, padding: 16, height: '100%' }}>
        <Grid container style={{ height: '100%' }}>
          <Conversation />
        </Grid>
      </Grid>
    </Grid>
  );
}

ConversationPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  conversationPage: makeSelectConversationPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ConversationPage);
