/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable dot-notation */
/* eslint-disable default-case */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { string, object, func, bool } from 'prop-types';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import { Prompt } from 'react-router';
import { isEqual, difference } from 'lodash';

import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import CESelector from 'components/CESelector';
import Attachments from 'components/Attachments';

import {
  addRequestMaterial,
  updateRequestMaterial,
  setMode,
} from 'containers/CostControlPage/actions';

import { NAMESPACE as PROJECT } from 'containers/ProjectPage/constants';
import { NAMESPACE } from 'containers/CostControlPage/constants';
import { StyledButton } from 'containers/CostControlPage/styles';

import FieldValidation from '../../../../../../validation/field-validation';

import {
  FormInput,
  StyledInputLabel,
  StyledTextField,
  ErrorMessage,
  DetailLabel,
  CommentWrapper,
  Comments,
  AttachmentWrapper,
} from './styles';

import { REQUEST_MATERIAL_MODEL } from '../../constants';
import { truncateDecimal, getCostBreakdown } from '../../../../../../helpers';

function Form(props) {
  const {
    mode,
    project,
    setMode,
    saving,
    requestMaterial,
    addRequestMaterial,
    updateRequestMaterial,
  } = props;
  const { projectId } = useParams();
  const field_validation = new FieldValidation(REQUEST_MATERIAL_MODEL);
  const { enqueueSnackbar } = useSnackbar();

  const [errors, setErrors] = useState({});
  const [request_material, setRequestMaterial] = useState({
    ...requestMaterial,
  });

  const confirm_message =
    'You have unsaved changes, are you sure you want to leave?';
  const getValues = base => {
    const fields = ['delivery_date', 'items', 'comments'];

    return fields.map(field => base[field]);
  };
  const hasChanges = !isEqual(
    getValues(request_material),
    getValues(requestMaterial),
  );

  useEffect(() => {
    /** set initial value for new PO */
    if (!request_material.id) {
      setRequestMaterial({
        ...request_material,
        created_date: new Date(),
        delivery_date: null,
        status: 'pending',
      });
    }
  }, []);

  const handleOnSubmit = async (override = {}) => {
    const payload = { ...request_material, ...override };

    try {
      if (request_material.id) {
        await updateRequestMaterial(projectId, payload);
        enqueueSnackbar('Updated', { variant: 'success' });
      } else {
        await addRequestMaterial(projectId, payload);
        enqueueSnackbar('Success', { variant: 'success' });
      }
      setMode('list');
    } catch (error) {
      enqueueSnackbar(error.toString(), { variant: 'error' });
    }
  };

  const handleOnCancel = () => {
    // eslint-disable-next-line no-alert
    const confirm = hasChanges ? window.confirm(confirm_message) : true;

    // eslint-disable-next-line no-unused-expressions
    confirm && setMode('list');
  };

  const handleOnChangeStatus = () => {
    const { status } = request_material;

    switch (status) {
      case 'pending':
        handleOnSubmit({ status: 'approved' });
        break;
      case 'approved':
        handleOnSubmit({ status: 'pending' });
        break;
    }
  };

  const handleOnChange = field => e => {
    const [parent, child] = field.split('.');
    const changes = { ...request_material };

    switch (parent) {
      case 'delivery_date':
        changes[parent] = e;
        break;
      case 'attachments':
      case 'items':
        changes[parent] = e;
        break;
      default:
        changes[parent] = e.target.value;
    }

    const {
      errors: { [field]: error },
    } = field_validation.validateFields(changes);

    setRequestMaterial(changes);
    setErrors({ ...errors, [field]: error });
  };

  const {
    created_date,
    rm_no,
    comments,
    delivery_date,
    items,
    sub_total,
    total_discount,
    grand_total,
    attachments,
    status,
  } = request_material;

  const { isValid } = field_validation.validateFields(request_material);
  const HEADER_MAPPING = {
    add: 'Requesting',
    edit: 'Requesting',
    view: 'Request',
  };

  return (
    <Grid container>
      <Prompt when={hasChanges} message={confirm_message} />
      {saving && (
        <Backdrop open style={{ zIndex: 5 }}>
          <CircularProgress style={{ color: '#fff' }} />
        </Backdrop>
      )}
      <Grid container alignItems="center">
        <Grid item xs={3}>
          <h4>{HEADER_MAPPING[mode]} Materials</h4>
        </Grid>
        <Grid item xs={5} style={{ textAlign: 'right' }}>
          {rm_no && `RM No.: ${rm_no}`}
        </Grid>
        <Grid item xs={4} style={{ textAlign: 'right' }}>
          Document Date: {moment(created_date).format('MM-DD-YYYY')}
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={4} style={{ display: 'flex', alignItems: 'center' }}>
          <StyledInputLabel>Project</StyledInputLabel>
          {project.name}
        </Grid>
        <Grid item xs={4} />
        <Grid item xs={4}>
          <FormInput>
            <StyledInputLabel>Delivery Date</StyledInputLabel>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-around">
                <KeyboardDatePicker
                  disabled={mode === 'view'}
                  autoOk
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  error={Boolean(errors['delivery_date'])}
                  value={delivery_date}
                  onChange={handleOnChange('delivery_date')}
                />
              </Grid>
            </MuiPickersUtilsProvider>
            <ErrorMessage style={{ right: 60 }}>
              {errors['delivery_date']}
            </ErrorMessage>
          </FormInput>
        </Grid>
      </Grid>
      <CESelector
        disabled={mode === 'view'}
        hiddenFields={{
          actual_price_per_unit: true,
          price_per_unit: true,
          discount: true,
          amount: true,
        }}
        items={items}
        onChange={handleOnChange}
      />
      <Grid container>
        <Grid item xs={6}>
          <CommentWrapper>
            <Comments>
              <div className="label">Comments or Special Instructions</div>
              <TextareaAutosize
                disabled={mode === 'view'}
                rowsMin={5}
                style={{ width: '100%' }}
                placeholder="Write your comment here..."
                value={comments}
                onChange={handleOnChange('comments')}
              />
            </Comments>
          </CommentWrapper>
        </Grid>
        <Grid item xs={6}>
          <Grid container justify="flex-end">
            <AttachmentWrapper>
              <Attachments
                disabled={mode === 'view'}
                onChange={handleOnChange('attachments')}
                attachments={attachments}
                path={`project/${projectId}`}
              />
            </AttachmentWrapper>
          </Grid>
          <Grid container justify="flex-end" style={{ marginTop: 32 }}>
            {mode === 'view' ? (
              <>
                <StyledButton
                  variant="outlined"
                  onClick={handleOnCancel}
                  style={{ marginRight: 16 }}
                >
                  Cancel
                </StyledButton>
                <StyledButton
                  variant="contained"
                  disabled={!isValid}
                  onClick={handleOnChangeStatus}
                >
                  {status === 'pending' ? 'Approve' : 'Reject'}
                </StyledButton>
              </>
            ) : (
              <>
                <StyledButton
                  variant="outlined"
                  onClick={handleOnCancel}
                  style={{ marginRight: 16 }}
                >
                  Cancel
                </StyledButton>
                <StyledButton
                  variant="contained"
                  disabled={!isValid}
                  onClick={() => handleOnSubmit()}
                >
                  Submit
                </StyledButton>
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

Form.propTypes = {
  mode: string.isRequired,
  requestMaterial: object,
  project: object,
  setMode: func,
  saving: bool,
  addRequestMaterial: func,
  updateRequestMaterial: func,
};

const mapStateToProps = state => {
  const {
    [NAMESPACE]: {
      mode,
      requestMaterials: { saving, requestMaterial },
    },
    [PROJECT]: { project },
  } = state;

  return {
    mode,
    project,
    saving,
    requestMaterial,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { setMode, addRequestMaterial, updateRequestMaterial },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form);
