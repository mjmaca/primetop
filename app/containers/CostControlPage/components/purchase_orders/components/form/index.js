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
import { isEqual, difference, isEmpty } from 'lodash';

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
  addPurchaseOrder,
  updatePurchaseOrder,
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
  AttachmentWrapper,
} from './styles';

import Details from './components/details';
import CostBreakdown from './components/cost_breakdown';
import PaymentInfo from './components/payment_info';

import { PURCHASE_ORDER_MODEL, PAYMENT_METHODS } from '../../constants';
import { truncateDecimal, getCostBreakdown } from '../../../../../../helpers';

function PurchaseOrderForm(props) {
  const {
    mode,
    project,
    addPurchaseOrder,
    updatePurchaseOrder,
    setMode,
    purchaseOrder,
    saving,
  } = props;
  const { projectId } = useParams();
  const field_validation = new FieldValidation(PURCHASE_ORDER_MODEL);
  const { enqueueSnackbar } = useSnackbar();

  const [errors, setErrors] = useState({});
  const [purchase_order, setPurchaseOrder] = useState({ ...purchaseOrder });

  const confirm_message =
    'You have unsaved changes, are you sure you want to leave?';
  const getValues = base => {
    const fields = [
      'delivery_date',
      'supplier',
      'delivery',
      'items',
      'payment_method',
      'payment_terms',
      'comments',
    ];

    return fields.map(field => base[field]);
  };
  const hasChanges = !isEqual(
    getValues(purchase_order),
    getValues(purchaseOrder),
  );

  useEffect(() => {
    /**
     * If items have been updated, recompute for totals
     */
    const { items } = purchase_order;
    let sub_total = 0;
    let total_discount = 0;
    const sanitize = num => (typeof num === 'number' ? num : 0);

    items.forEach(item => {
      const { actual_amount, discount } = getCostBreakdown(item);

      sub_total += actual_amount;
      total_discount += discount;
    });

    setPurchaseOrder({
      ...purchase_order,
      sub_total: truncateDecimal(sub_total),
      total_discount: truncateDecimal(total_discount),
      grand_total: truncateDecimal(sub_total - total_discount),
    });
  }, [purchase_order.items]);

  useEffect(() => {
    /** set initial value for new PO */
    if (!purchase_order.id) {
      setPurchaseOrder({
        ...purchase_order,
        created_date: new Date(),
        delivery_date: null,
        payment_method: 'cash',
        status: 'pending',
      });
    }
  }, []);

  const handleOnSubmit = async (override = {}) => {
    const payload = { ...purchase_order, ...override };

    try {
      if (purchase_order.id) {
        await updatePurchaseOrder(projectId, payload);
        enqueueSnackbar('Updated', { variant: 'success' });
      } else {
        await addPurchaseOrder(projectId, payload);
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
    const { status } = purchase_order;

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
    const changes = { ...purchase_order };

    switch (parent) {
      case 'delivery_date':
        changes[parent] = e;
        break;
      case 'supplier':
      case 'delivery':
        changes[parent] = {
          ...changes[parent],
          [child]: e.target.value,
        };

        switch (child) {
          case 'province':
            changes[parent] = {
              ...changes[parent],
              city: '',
            };
            break;
        }
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

    setPurchaseOrder(changes);
    setErrors({ ...errors, [field]: error });
  };

  const handleOnBlur = field => () => {};

  const {
    supplier,
    delivery,
    created_date,
    po_no,
    payment_method,
    payment_terms,
    comments,
    delivery_date,
    items,
    attachments,
    status,
    sub_total,
    total_discount,
    grand_total,
  } = purchase_order;
  const today = new Date();

  const { isValid } = field_validation.validateFields(purchase_order);
  const HEADER_MAPPING = { add: 'Create', edit: 'Edit', view: 'View' };

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
          <h4>{HEADER_MAPPING[mode]} Purchase Order</h4>
        </Grid>
        <Grid item xs={5} style={{ textAlign: 'right' }}>
          {po_no && `Purchase Order Code: ${po_no}`}
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
        <Grid item xs={4}>
          <FormInput>
            <StyledInputLabel>Supplier Name</StyledInputLabel>
            <StyledTextField
              disabled={mode === 'view'}
              variant="outlined"
              size="small"
              error={Boolean(errors['supplier.name'])}
              value={supplier.name || ''}
              onChange={handleOnChange('supplier.name')}
              onBlur={handleOnBlur('supplier.name')}
            />
            <ErrorMessage>{errors['supplier.name']}</ErrorMessage>
          </FormInput>
        </Grid>
        <Grid item xs={4}>
          <FormInput>
            <StyledInputLabel>Delivery Date</StyledInputLabel>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-around">
                <KeyboardDatePicker
                  disabled={mode === 'view'}
                  autoOk
                  minDate={today}
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  error={Boolean(errors['delivery_date'])}
                  value={delivery_date}
                  onChange={handleOnChange('delivery_date')}
                  onBlur={handleOnBlur('delivery_date')}
                />
              </Grid>
            </MuiPickersUtilsProvider>
            <ErrorMessage style={{ right: 60 }}>
              {errors['delivery_date']}
            </ErrorMessage>
          </FormInput>
        </Grid>
      </Grid>
      <Grid container spacing={2} >
        <Grid item xs={6}>
          <Details
            disabled={mode === 'view'}
            label="Supplier Details"
            field="supplier"
            errors={errors}
            details={supplier}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
          />
        </Grid>
        <Grid item xs={6}>
          <Details
            disabled={mode === 'view'}
            label="Delivery Details"
            field="delivery"
            errors={errors}
            details={delivery}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
          />
        </Grid>
      </Grid>
      <CESelector
        disabled={mode === 'view'}
        items={items}
        onChange={handleOnChange}
      />
      <Grid container>
        <Grid item xs={6}>
          <PaymentInfo
            disabled={mode === 'view'}
            payment_method={payment_method}
            payment_terms={payment_terms}
            comments={comments}
            onChange={handleOnChange}
          />
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

PurchaseOrderForm.propTypes = {
  mode: string.isRequired,
  project: object,
  addPurchaseOrder: func,
  updatePurchaseOrder: func,
  setMode: func,
  purchaseOrder: object,
  saving: bool,
};

const mapStateToProps = state => {
  const {
    [NAMESPACE]: {
      mode,
      purchaseOrders: { purchaseOrder, saving },
    },
    [PROJECT]: { project },
  } = state;

  if (isEmpty(purchaseOrder.id)) {
    purchaseOrder.delivery = {
      province: project.province,
      city: project.city,
      zip: project.zipcode,
      street: project.street,
    };
  }

  return {
    mode,
    project,
    purchaseOrder,
    saving,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { addPurchaseOrder, updatePurchaseOrder, setMode },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PurchaseOrderForm);
