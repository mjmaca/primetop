/* eslint-disable camelcase */
/* eslint-disable no-shadow */
/**
 *
 * ProfilePage
 *
 */

import React, { memo, useEffect, createRef } from 'react';
import { func, object, bool } from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';

import Avatar from '@material-ui/core/Avatar';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

import Form from './Form';

import {
  AvatarWrapper,
  UploaderIconWrapper,
  StyledProfile,
  ProfileWrapper,
  ProfileTitle,
} from './styles';
import { NAMESPACE } from './constants';
import { fetchProfile, uploadAvatar } from './actions';

export function ProfilePage(props) {
  const { profile, uploading, fetchProfile, uploadAvatar } = props;
  const { id, avatar } = profile;
  const fileUploader = createRef();

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleOnSelectFile = () => {
    fileUploader.current.click();
  };

  const handleOnUploadFile = async e => {
    const file = e.target.files.item(0);
    uploadAvatar(id, file);
  };

  return (
    <StyledProfile>
      <ProfileWrapper>
        <ProfileTitle>My Profile</ProfileTitle>
        <AvatarWrapper>
          <input
            type="file"
            accept="image/*"
            multiple
            style={{ display: 'none' }}
            ref={fileUploader}
            onChange={handleOnUploadFile}
          />
          <Avatar src={avatar} style={{ opacity: uploading ? 0.5 : 1 }} />
          <UploaderIconWrapper className="uploader">
            <PhotoCameraIcon
              style={{ fontSize: 16 }}
              onClick={handleOnSelectFile}
            />
          </UploaderIconWrapper>
        </AvatarWrapper>
      </ProfileWrapper>
      <Form {...props} />
    </StyledProfile>
  );
}

ProfilePage.propTypes = {
  fetchProfile: func,
  uploadAvatar: func,
  profile: object,
  uploading: bool,
};

const mapStateToProps = state => {
  const {
    [NAMESPACE]: { profile, uploading },
  } = state;

  return {
    profile,
    uploading,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchProfile, uploadAvatar }, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ProfilePage);
