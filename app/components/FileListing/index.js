/**
 *
 * FileListing
 *
 */

import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import moment from 'moment';
import { saveAs } from 'file-saver';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Grid, IconButton } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';

const useStyles = makeStyles({
  table: {
    width: '100%',
  },
  paper: {
    width: 170,
    height: 225,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: 16,
    margin: 8,
  },
});

const humanFileSize = size => {
  const i = Math.floor(Math.log(size) / Math.log(1024));
  // eslint-disable-next-line no-restricted-properties
  return `${(size / Math.pow(1024, i)).toFixed(2) * 1} ${
    ['B', 'KB', 'MB', 'GB', 'TB'][i]
  }`;
};

function FileListing() {
  const classes = useStyles();
  const [files, setFiles] = useState([]);
  const { projectId } = useParams();
  const storageRef = firebase.storage().ref();
  const storageFolder = storageRef.child(`project/${projectId}`);

  useEffect(() => {
    storageFolder
      .listAll()
      .then(res => {
        const itemsList = [];
        res.items.forEach(itemRef => {
          itemsList.push(itemRef);
        });

        const data = [];
        asyncForEach(res.items, async itemRef => {
          const i = await itemRef.getMetadata();
          data.push(i);
        }).then(() => {
          setFiles(data);
        });
      })
      .catch(error => {
        console.log('error: ', error);
      });
  }, []);

  const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index += 1) {
      // eslint-disable-next-line no-await-in-loop
      await callback(array[index], index, array);
    }
  };

  const handleDownload = (fullPath, fileName) => {
    storageRef
      .child(fullPath)
      .getDownloadURL()
      .then(url => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.onload = () => {
          saveAs(xhr.response, fileName);
        };
        xhr.send();
      })
      .catch(error => {
        console.log('errors download file', error);
      });
  };

  return (
    <div className={classes.root}>
      <Grid className={classes.fileholder} item xs={12} md={12}>
        <Grid container>
          <TableContainer className={classes.container}>
            <Table
              className={classes.table}
              size="small"
              stickyHeader
              aria-label="sticky table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>File Name</TableCell>
                  <TableCell align="right">File Size</TableCell>
                  <TableCell align="right">Date Uploaded</TableCell>
                  <TableCell align="center">Download</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {files.map(file => (
                  <TableRow key={file.name}>
                    <TableCell component="th" scope="row">
                      {file.name}
                    </TableCell>
                    <TableCell align="right">
                      {humanFileSize(file.size)}
                    </TableCell>
                    <TableCell align="right">
                      {moment(file.timeCreated).format('MMMM DD, YYYY')}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={() => {
                          handleDownload(file.fullPath, file.name);
                        }}
                        edge="end"
                        aria-label="delete"
                      >
                        <GetAppIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
}

FileListing.propTypes = {};

export default FileListing;
