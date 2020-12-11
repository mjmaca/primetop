/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
/* eslint-disable react/no-array-index-key */
import React, { createRef, useState } from 'react';
import { func, array, string, bool } from 'prop-types';
import firebase from 'firebase/app';
import moment from 'moment';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';

import {
  StyledAddButton,
  ActionWrapper,
  AttachmentWrapper,
  Attachment,
} from './styles';

function Attachments(props) {
  const { disabled, onChange, attachments, path } = props;
  const storage = firebase.storage();
  const uploader = createRef();
  const [uploading, setUploading] = useState(false);

  const upload = async (files, index = 0, urls = []) => {
    const file = files.item(index++);
    const storageRef = storage.ref(
      `${path}/${file.name}-${moment().format('MM-DD-YYYY HH:MM:SS')}`,
    );
    const result = await storageRef.put(file);
    const file_url = await result.ref.getDownloadURL();
    urls.push(file_url);

    if (index < files.length) {
      return upload(files, index, urls);
    }

    return urls;
  };

  const handleOnClickUpload = () => {
    uploader.current.click();
  };

  const handleOnUpload = async e => {
    e.persist();
    setUploading(true);
    const urls = await upload(e.target.files);
    onChange && onChange([...attachments, ...urls]);
    setUploading(false);
  };

  return (
    <div>
      <ActionWrapper>
        {uploading && (
          <Backdrop open style={{ zIndex: 5 }}>
            <CircularProgress style={{ color: '#fff' }} />
          </Backdrop>
        )}
        <input
          accept="image/*"
          multiple
          type="file"
          style={{ display: 'none' }}
          ref={uploader}
          onChange={handleOnUpload}
        />
        <div className="label">Attachments:</div>
        {!disabled && (
          <StyledAddButton
            size="small"
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleOnClickUpload}
          >
            Add Photo
          </StyledAddButton>
        )}
      </ActionWrapper>
      <AttachmentWrapper>
        {attachments.map((url, index) => (
          <Attachment
            key={index}
            url={url}
            onClick={() => {
              window.open(url, '_blank');
            }}
          />
        ))}
      </AttachmentWrapper>
    </div>
  );
}

Attachments.propTypes = {
  disabled: bool,
  onChange: func,
  attachments: array,
  path: string.isRequired,
};

Attachments.defaultProps = {
  attachments: [],
};

export default Attachments;
