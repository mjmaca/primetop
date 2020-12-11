/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { object, bool, func } from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import PersonIcon from '@material-ui/icons/Person';
import PhoneIcon from '@material-ui/icons/Phone';
import BusinessIcon from '@material-ui/icons/Business';
import RoomIcon from '@material-ui/icons/Room';
import MailIcon from '@material-ui/icons/Mail';

import {
  FieldInput,
  FormWrapper,
  FormActionWrapper,
  StyledInput,
  StyledSubmitButton,
  StyledCancelButton,
} from './styles';

import { initialState } from './reducer';
import { NAMESPACE } from './constants';
import { updateProfile } from './actions';

function ProfileForm(props) {
  const history = useHistory();
  const { updateProfile } = props;
  const [profile, setProfile] = useState(initialState.profile);
  const {
    first_name,
    last_name,
    mobile,
    company,
    province,
    city,
    email,
  } = profile;
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setProfile(props.profile);
  }, [props.profile.id, props.profile.email]);

  async function handleOnSubmit() {
    /** Update Profile on submit */
    const { id } = profile;

    await updateProfile(profile);
    enqueueSnackbar(
      `Your profile has been successfully ${id ? 'updated' : 'created'}.`,
      { variant: 'success' },
    );
  }

  function handleOnCancel() {
    /** Redirect to dashboard on Cancel */
    history.push('/projects');
  }

  function handleOnChange(fieldName) {
    return e => {
      const changes = { ...profile };

      switch (fieldName) {
        default:
          changes[fieldName] = e.target.value;
      }

      setProfile(changes);
    };
  }

  return (
    <FormWrapper>
      <FieldInput style={{ marginTop: 0 }}>
        <PersonIcon style={{ color: '#106a9f' }} />
        <StyledInput
          placeholder="First Name"
          value={first_name}
          onChange={handleOnChange('first_name')}
        />
      </FieldInput>
      <FieldInput>
        <PersonIcon style={{ color: '#106a9f' }} />
        <StyledInput
          placeholder="Last Name"
          value={last_name}
          onChange={handleOnChange('last_name')}
        />
      </FieldInput>
      <FieldInput>
        <PhoneIcon style={{ color: '#106a9f' }} />
        <StyledInput
          placeholder="Mobile"
          value={mobile}
          onChange={handleOnChange('mobile')}
        />
      </FieldInput>
      <FieldInput>
        <BusinessIcon style={{ color: '#106a9f' }} />
        <StyledInput
          disabled
          placeholder="Company"
          value={company}
          onChange={handleOnChange('company')}
          style={{ boxShadow: ' none', background: `white` }}
        />
      </FieldInput>
      <FieldInput className="Combobox">
        <RoomIcon style={{ color: '#106a9f' }} />
        <StyledInput
          placeholder="Province"
          value={province}
          onChange={handleOnChange('province')}
        />
      </FieldInput>
      <FieldInput className="Combobox">
        <RoomIcon style={{ color: '#106a9f' }} />
        <StyledInput
          placeholder="City"
          value={city}
          onChange={handleOnChange('city')}
        />
      </FieldInput>
      <FieldInput>
        <MailIcon style={{ color: '#106a9f' }} />
        <StyledInput
          disabled
          placeholder="Email"
          type="email"
          value={email}
          onChange={handleOnChange('email')}
          style={{ boxShadow: ' none', background: `white` }}
        />
      </FieldInput>
      <FormActionWrapper>
        <StyledCancelButton onClick={handleOnCancel}>Back</StyledCancelButton>
        <StyledSubmitButton onClick={handleOnSubmit} disabled={props.saving}>
          Save
        </StyledSubmitButton>
      </FormActionWrapper>
    </FormWrapper>
  );
}

ProfileForm.propTypes = {
  profile: object,
  saving: bool,
  updateProfile: func,
};

const mapStateToProps = state => {
  const {
    [NAMESPACE]: { profile, saving },
  } = state;

  return {
    profile,
    saving,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateProfile }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileForm);
