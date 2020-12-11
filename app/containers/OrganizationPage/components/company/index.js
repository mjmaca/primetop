/* eslint-disable no-shadow */
/* eslint-disable camelcase */
/* eslint-disable dot-notation */
import React, { useState, createRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { object, bool, func } from 'prop-types';
import firebase from 'firebase/app';
import { useSnackbar } from 'notistack';

import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

import { NAMESPACE } from '../../constants';
import { updateCompany } from '../../actions';

import {
  StyledCompany,
  LogoWrapper,
  Logo,
  InfoWrapper,
  FormInput,
  StyledInputLabel,
  SubmitWrapper,
  StyledTextField,
  ErrorMessage,
  UploadTrigger,
} from './styles';

import MODEL from './model';
import FieldValidation from '../../../../validation/field-validation';

function Company(props) {
  const { company, saving, updateCompany } = props;
  const [errors, setError] = useState({});
  const [uploading, setIsUploading] = useState(false);
  const [info, setInfo] = useState({ ...company, email: company.owner });
  const { logo, display_name, address, tin, fax, contact_no, email } = info;
  const uploader = createRef();
  const { enqueueSnackbar } = useSnackbar();
  const field_validation = new FieldValidation(MODEL);

  const handleOnChange = field => e => {
    const changes = { ...info };

    switch (field) {
      default:
        changes[field] = e.target.value;
    }

    const {
      errors: { [field]: error },
    } = field_validation.validateFields(changes);

    setInfo(changes);
    setError({ ...errors, [field]: error });
  };

  const handleOnUploadFile = async e => {
    setIsUploading(true);
    const file = e.target.files.item(0);
    const storage = firebase.storage();
    const storageRef = storage.ref(`logo/${company.id}/logo`);
    const result = await storageRef.put(file);
    const logo = await result.ref.getDownloadURL();
    await updateCompany({ ...info, logo });
    setInfo({ ...info, logo });
    setIsUploading(false);
  };

  const handleOnClickUpload = () => {
    uploader.current.click();
  };

  const handleOnSubmit = async () => {
    await updateCompany(info);
    enqueueSnackbar('Success', { variant: 'success' });
  };

  const { isValid } = field_validation.validateFields(info);

  return (
    <StyledCompany>
      {(saving || uploading) && (
        <Backdrop open style={{ zIndex: 5 }}>
          <CircularProgress style={{ color: '#fff' }} />
        </Backdrop>
      )}
      <LogoWrapper>
        <input
          type="file"
          accept="image/*"
          multiple
          style={{ display: 'none' }}
          ref={uploader}
          onChange={handleOnUploadFile}
        />
        <Logo url={logo}>
          <UploadTrigger>
            <AddAPhotoIcon fontSize="small" onClick={handleOnClickUpload} />
          </UploadTrigger>
        </Logo>
      </LogoWrapper>
      <InfoWrapper>
        <FormInput>
          <StyledInputLabel>Company Name</StyledInputLabel>
          <StyledTextField
            variant="outlined"
            size="small"
            error={!!errors['display_name']}
            value={display_name}
            onChange={handleOnChange('display_name')}
          />
          <ErrorMessage>{errors['display_name']}</ErrorMessage>
        </FormInput>
        <FormInput>
          <StyledInputLabel>Address</StyledInputLabel>
          <StyledTextField
            variant="outlined"
            size="small"
            error={!!errors['address']}
            value={address}
            onChange={handleOnChange('address')}
          />
          <ErrorMessage>{errors['address']}</ErrorMessage>
        </FormInput>
        <FormInput>
          <StyledInputLabel>TIN</StyledInputLabel>
          <StyledTextField
            variant="outlined"
            size="small"
            error={!!errors['tin']}
            value={tin}
            onChange={handleOnChange('tin')}
          />
          <ErrorMessage>{errors['tin']}</ErrorMessage>
        </FormInput>
        <FormInput>
          <StyledInputLabel>Contact Number</StyledInputLabel>
          <StyledTextField
            variant="outlined"
            size="small"
            error={!!errors['contact_no']}
            value={contact_no}
            onChange={handleOnChange('contact_no')}
          />
          <ErrorMessage>{errors['contact_no']}</ErrorMessage>
        </FormInput>
        <FormInput>
          <StyledInputLabel>Fax</StyledInputLabel>
          <StyledTextField
            variant="outlined"
            size="small"
            error={!!errors['fax']}
            value={fax}
            onChange={handleOnChange('fax')}
          />
          <ErrorMessage>{errors['fax']}</ErrorMessage>
        </FormInput>
        <FormInput>
          <StyledInputLabel>Company Email</StyledInputLabel>
          <StyledTextField
            variant="outlined"
            size="small"
            error={!!errors['email']}
            value={email}
            onChange={handleOnChange('email')}
          />
          <ErrorMessage>{errors['email']}</ErrorMessage>
        </FormInput>
        <SubmitWrapper>
          <Button
            variant="contained"
            color="primary"
            disabled={!isValid}
            onClick={handleOnSubmit}
          >
            Save
          </Button>
        </SubmitWrapper>
      </InfoWrapper>
    </StyledCompany>
  );
}

Company.propTypes = {
  company: object,
  saving: bool,
  updateCompany: func,
};

const mapStateToProps = state => {
  const {
    [NAMESPACE]: { company, saving },
  } = state;

  return {
    company,
    saving,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateCompany }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Company);
