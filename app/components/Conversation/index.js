/* eslint-disable no-return-assign */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/**
 *
 * Conversation
 *
 */

import React, { useEffect, useState, createRef, Fragment } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase/app';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import SpeakerNotesOffIcon from '@material-ui/icons/SpeakerNotesOff';
import Backdrop from '@material-ui/core/Backdrop';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import { fetchProfile } from 'containers/ProfilePage/actions';
import { NAMESPACE as PROFILE } from 'containers/ProfilePage/constants';

import { Preview, EmptyHolder } from './styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
  },
  inline: {
    display: 'inline',
  },
  chatlist: {
    display: 'flex',
    justifyContent: 'center',
    margin: 0,
    height: 'calc(100% - 74px)',
    width: '100%',
  },
  chatform: {
    display: 'flex',
    justifyContent: 'center',
    margin: 0,
    marginTop: 16,
    width: '100%',
  },
  chatbox: {
    width: '80%',
  },
  send: {
    marginLeft: 16,
    height: 56,
  },
}));

function Conversation(props) {
  const { currentUser } = firebase.auth();
  const storage = firebase.storage();
  const classes = useStyles();
  const { projectId } = useParams();
  const [message, setMessage] = useState();
  const [messageList, setMessageList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const fileUploader = createRef();
  const listRef = createRef();
  const { fetchProfile, profile } = props;

  const fetchMessages = () => {
    firebase
      .firestore()
      .collection('projects')
      .doc(projectId)
      .collection('conversations')
      .orderBy('created_at')
      .get()
      .then(snapshot => {
        const messages = [];
        snapshot.forEach(doc => {
          messages.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setMessageList(messages);
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  };

  const handleSendMsg = () => {
    firebase
      .firestore()
      .collection('projects')
      .doc(projectId)
      .collection('conversations')
      .add({
        message,
        created_by: currentUser.email,
        first_name: profile.first_name,
        last_name: profile.last_name,
        avatar: profile.avatar || '',
        created_at: Date.now(),
      })
      .then(() => {
        setMessage('');
        fetchMessages();
      });
  };

  const handleOnSelectFile = () => {
    fileUploader.current.click();
  };

  const upload = async (files, index = 0, results = []) => {
    const file = files.item(index++);
    const storageRef = storage.ref(
      `conversation/${projectId}/${file.name}-${moment().format(
        'MM-DD-YYYY HH:MM:SS',
      )}`,
    );
    const result = await storageRef.put(file);
    const file_url = await result.ref.getDownloadURL();
    await firebase
      .firestore()
      .collection('projects')
      .doc(projectId)
      .collection('conversations')
      .add({
        file_url,
        created_by: currentUser.email,
        first_name: profile.first_name,
        last_name: profile.last_name,
        avatar: profile.avatar || '',
        created_at: Date.now(),
      });
    results.push(result);
    fetchMessages();

    if (index < files.length) {
      return upload(files, index, results);
    }

    return results;
  };

  const handleOnUploadFile = async e => {
    e.persist();
    setUploading(true);
    await upload(e.target.files);
    setUploading(false);
  };

  useEffect(() => {
    fetchMessages();
    fetchProfile();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  const renderEmptyState = () => {
    if (!messageList.length) {
      return (
        <EmptyHolder>
          <Typography variant="h4">No messages</Typography>
          <SpeakerNotesOffIcon fontSize="large" />
          <Typography>
            This is where all your project conversation live
          </Typography>
        </EmptyHolder>
      );
    }
    return null;
  };

  const scrollToBottom = () => {
    listRef.current.scrollTop = listRef.current.scrollHeight;
  };

  const handleOnKeyDown = e => {
    if (e.key === 'Enter') {
      handleSendMsg();
    }
  };

  return (
    <Grid container style={{ height: '100%' }}>
      {uploading && (
        <Backdrop open style={{ zIndex: 5 }}>
          <CircularProgress style={{ color: '#fff' }} />
        </Backdrop>
      )}
      <input
        type="file"
        accept="image/*"
        multiple
        style={{ display: 'none' }}
        ref={fileUploader}
        onChange={handleOnUploadFile}
      />
      <Box m={3} className={classes.chatlist}>
        <List className={classes.root} ref={listRef}>
          {renderEmptyState()}
          {messageList.map(msg => {
            const {
              id,
              data: {
                message,
                first_name = '',
                last_name = '',
                avatar,
                created_at,
                file_url,
              },
            } = msg;

            return (
              <Fragment key={id}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      alt={`${first_name.split(' ')[0]} ${last_name}`}
                      src={avatar}
                    />
                  </ListItemAvatar>
                  {file_url ? (
                    <ListItemText
                      primary={
                        <Preview
                          url={file_url}
                          onClick={() => {
                            window.open(file_url, '_blank');
                          }}
                        />
                      }
                      secondary={`${moment(
                        created_at,
                      ).fromNow()} by ${first_name}`}
                    />
                  ) : (
                    <ListItemText
                      primary={message}
                      secondary={`${moment(
                        created_at,
                      ).fromNow()} by ${first_name}`}
                    />
                  )}
                </ListItem>
                <Divider variant="inset" component="li" />
              </Fragment>
            );
          })}
        </List>
      </Box>
      <Box m={3} className={classes.chatform}>
        <TextField
          value={message}
          variant="outlined"
          className={classes.chatbox}
          onKeyDown={handleOnKeyDown}
          onChange={e => setMessage(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          disableElevation
          className={classes.send}
          onClick={handleOnSelectFile}
        >
          <ImageIcon />
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          disableElevation
          className={classes.send}
          onClick={handleSendMsg}
        >
          SEND
        </Button>
      </Box>
    </Grid>
  );
}

Conversation.propTypes = {};

const mapStateToProps = state => {
  const {
    [PROFILE]: { profile },
  } = state;

  return {
    profile,
  };
};

export default connect(
  mapStateToProps,
  { fetchProfile },
)(Conversation);
