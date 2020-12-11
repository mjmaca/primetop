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

import Attachments from 'components/Attachments';

import {
  addLabor,
  updateLabor,
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

import { LABOR_MODEL } from '../../constants';
import { truncateDecimal, getCostBreakdown } from '../../../../../../helpers';

import CostBreakdown from './component/cost_breakdown';
import CESelector from './component/CESelector';

function Form(props) {
  const {
    mode,
    project,
    setMode,
    saving,
    labor: laborItem,
    addLabor,
    updateLabor,
  } = props;
  const { projectId } = useParams();
  const field_validation = new FieldValidation(LABOR_MODEL);
  const { enqueueSnackbar } = useSnackbar();

  const [errors, setErrors] = useState({});
  const [labor, setLabor] = useState({
    ...laborItem,
  });

  const confirm_message =
    'You have unsaved changes, are you sure you want to leave?';
  const getValues = base => {
    const fields = ['payment_date', 'items', 'comments'];

    return fields.map(field => base[field]);
  };
  const hasChanges = !isEqual(getValues(labor), getValues(laborItem));

  useEffect(() => {
    /**
     * If items have been updated, recompute for totals
     */
    const { items } = labor;
    let sub_total = 0;
    const sanitize = num => (typeof num === 'number' ? num : 0);

    items.forEach(item => {
      const { total_amount } = getCostBreakdown(item);

      sub_total += total_amount;
    });

    setLabor({
      ...labor,
      sub_total: truncateDecimal(sub_total),
      total_discount: 0,
      grand_total: truncateDecimal(sub_total),
    });
  }, [labor.items]);

  useEffect(() => {
    /** set initial value for new PO */
    if (!labor.id) {
      setLabor({
        ...labor,
        created_date: new Date(),
        payment_date: null,
        status: 'pending',
      });
    }
  }, []);

  const handleOnSubmit = async (override = {}) => {
    const payload = { ...labor, ...override };

    try {
      if (labor.id) {
        await updateLabor(projectId, payload);
        enqueueSnackbar('Updated', { variant: 'success' });
      } else {
        await addLabor(projectId, payload);
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

  const handleOnChange = field => e => {
    const changes = { ...labor };

    switch (field) {
      case 'payment_date':
        changes[field] = e;
        break;
      case 'attachments':
      case 'items':
        changes[field] = e;
        break;
      default:
        changes[field] = e.target.value;
    }

    const {
      errors: { [field]: error },
    } = field_validation.validateFields(changes);

    setLabor(changes);
    setErrors({ ...errors, [field]: error });
  };

  const {
    created_date,
    l_no,
    comments,
    payment_date,
    items,
    sub_total,
    total_discount,
    grand_total,
    attachments,
    status,
  } = labor;

  const { isValid } = field_validation.validateFields(labor);

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
          <h4>Labor</h4>
        </Grid>
        <Grid item xs={5} style={{ textAlign: 'right' }}>
          {l_no && `Labor No.: ${l_no}`}
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
            <StyledInputLabel>Payment Date</StyledInputLabel>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-around">
                <KeyboardDatePicker
                  disabled={mode === 'view'}
                  autoOk
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  error={Boolean(errors['payment_date'])}
                  value={payment_date}
                  onChange={handleOnChange('payment_date')}
                />
              </Grid>
            </MuiPickersUtilsProvider>
            <ErrorMessage style={{ right: 60 }}>
              {errors['payment_date']}
            </ErrorMessage>
          </FormInput>
        </Grid>
      </Grid>
      <CESelector
        disabled={mode === 'view'}
        items={items}
        onChange={handleOnChange}
      />
      <Grid container>
        <Grid item xs={6}>
          <CommentWrapper>
            <Comments>
              <div className="label">Comments</div>
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
          <Grid container justify="flex-end">
            <CostBreakdown {...{ sub_total, total_discount, grand_total }} />
          </Grid>
          <Grid container justify="flex-end" style={{ marginTop: 32 }}>
            {mode === 'view' ? (
              <StyledButton
                variant="outlined"
                onClick={handleOnCancel}
                style={{ marginRight: 16 }}
              >
                Cancel
              </StyledButton>
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
  labor: object,
  project: object,
  setMode: func,
  saving: bool,
  addLabor: func,
  updateLabor: func,
};

const mapStateToProps = state => {
  const {
    [NAMESPACE]: {
      mode,
      labors: { saving, labor },
    },
    [PROJECT]: { project },
  } = state;

  return {
    mode,
    project,
    saving,
    labor,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ setMode, addLabor, updateLabor }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form);
