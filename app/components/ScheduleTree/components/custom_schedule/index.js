/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-shadow */
/* eslint-disable dot-notation */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { isEmpty } from 'lodash';
import { object, bool, func, string } from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { NAMESPACE as SCHEDULE } from 'containers/SchedulePage/constants';
import {
  saveCustomSchedule,
  updateCustomSchedule,
} from 'containers/SchedulePage/actions';

import { StyledCustomSchedule, ActionSection } from './styles';

const CustomSchedule = props => {
  const { projectId } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const {
    schedule,
    onCancel,
    onSuccess,
    saveCustomSchedule,
    updateCustomSchedule,
    saving,
    mode,
  } = props;
  const [name, setName] = useState(mode === 'edit' ? schedule.text : '');
  const [error, setError] = useState('');

  const handleOnSubmit = async () => {
    try {
      if (mode === 'add') {
        const payload = {
          text: name,
          create_date: new Date(),
          parent: schedule.id || 0,
          isCustom: true,
        };
        const custom_schedule = await saveCustomSchedule(projectId, payload);
        onSuccess(custom_schedule);
      } else {
        const custom_schedule = await updateCustomSchedule(projectId, {
          ...schedule,
          text: name,
        });
        onSuccess(custom_schedule);
      }
      enqueueSnackbar('Success', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(error.toString(), { variant: 'error' });
    }
  };

  const handleOnChange = e => {
    setName(e.target.value);
    setError(isEmpty(e.target.value) && 'Name is required');
  };

  const handleOnKeyDown = e => {
    if (e.key === 'Enter') {
      handleOnSubmit();
    }
  };

  return (
    <StyledCustomSchedule>
      <TextField
        autoFocus
        label="Name"
        variant="outlined"
        error={!!error}
        helperText={error}
        value={name}
        onChange={handleOnChange}
        onKeyDown={handleOnKeyDown}
        style={{ width: '100%' }}
      />
      <ActionSection>
        <Button
          variant="outlined"
          onClick={onCancel}
          style={{ marginRight: 8 }}
        >
          Cancel
        </Button>
        <Button
          disabled={isEmpty(name) || saving}
          variant="contained"
          color="primary"
          onClick={handleOnSubmit}
        >
          {saving ? 'Saving...' : 'Save'}
        </Button>
      </ActionSection>
    </StyledCustomSchedule>
  );
};

CustomSchedule.propTypes = {
  schedule: object,
  onCancel: func,
  onSuccess: func,
  saving: bool,
  saveCustomSchedule: func,
  updateCustomSchedule: func,
  mode: string,
};

const mapStateToProps = state => {
  const {
    [SCHEDULE]: { saving },
  } = state;

  return {
    saving,
  };
};

const mapDispatchToProps = { saveCustomSchedule, updateCustomSchedule };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomSchedule);
