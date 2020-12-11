/**
 *
 * FileUpload
 *
 */

import React, { createRef, useState } from 'react';
import firebase from 'firebase/app';
import { useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
  upload: {
    marginTop: 16,
  },
  buttonProgress: {
    color: '#FFFFFF',
  },
});

function FileUpload() {
  const { projectId } = useParams();
  const uploader = createRef();
  const storage = firebase.storage();
  const classes = useStyles();
  const [isLoading, setLoading] = useState(false);

  const upload = async (files, index) => {
    // eslint-disable-next-line no-param-reassign
    const file = files.item((index += 1));
    const storageRef = storage.ref(`project/${projectId}/${file.name}`);
    await storageRef.put(file);
  };

  const handleOnUpload = async e => {
    setLoading(true);
    e.persist();
    await upload(e.target.files);
    window.location.reload();
  };

  const handleOnClickUpload = () => {
    uploader.current.click();
  };

  return (
    <Grid container justify="space-between" alignItems="center">
      <Box p={1}>
        <Typography variant="h6" className={classes.title}>
          Upload and manage project files
        </Typography>
      </Box>
      <Box p={1}>
        <Button
          className={classes.buttonProgress}
          variant="contained"
          color="primary"
          onClick={handleOnClickUpload}
          disableElevation
        >
          File Upload
          {isLoading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </Button>
        <input
          accept="image/*"
          multiple
          type="file"
          style={{ display: 'none' }}
          ref={uploader}
          onChange={handleOnUpload}
        />
      </Box>
    </Grid>
  );
}

FileUpload.propTypes = {};

export default FileUpload;
