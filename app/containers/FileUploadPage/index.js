/**
 *
 * FileUploadPage
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import FileUpload from 'components/FileUpload';
import FileListing from 'components/FileListing';
import Sidebar from 'components/Sidebar';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectFileUploadPage from './selectors';
import reducer from './reducer';
import saga from './saga';

export function FileUploadPage() {
  useInjectReducer({ key: 'fileUploadPage', reducer });
  useInjectSaga({ key: 'fileUploadPage', saga });

  return (
    <Grid container style={{ height: '100vh' }}>
      <Grid item xs={2}>
        <Sidebar />
      </Grid>
      <Grid item xs={10} style={{ flexGrow: 1, padding: 16 }}>
        <Paper>
          <Grid container direction="column">
            <Grid md={12} item>
              <FileUpload />
            </Grid>
            <Grid md={12} item>
              <FileListing />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

FileUploadPage.propTypes = {
  // dispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  fileUploadPage: makeSelectFileUploadPage(),
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

export default compose(withConnect)(FileUploadPage);
