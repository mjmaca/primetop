/* eslint-disable dot-notation */
/* eslint-disable camelcase */
/* eslint-disable no-shadow */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { oneOf, func, object, bool } from 'prop-types';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import FieldValidation from '../../../../../../validation/field-validation';
import { FormInput } from '../../styles';

import { LABOR_COST_MODEL } from '../../constants';
import { NAMESPACE, PERSONNEL_TYPE } from '../../../../constants';

function LaborCostForm(props) {
  const { mode, onCancel, onSave, costEstimate, saving } = props;
  const [errors, setErrors] = useState({});
  const [labor_cost, setLaborCost] = useState({ ...costEstimate });
  const field_validation = new FieldValidation(LABOR_COST_MODEL);
  const { isValid } = field_validation.validateFields(labor_cost);

  const {
    personnel = '',
    type = '',
    quantity = '',
    working_days = '',
    rate = '',
    amount = '', // quantity * working_days * rate
  } = labor_cost;

  const handleOnChange = field => e => {
    const changes = { ...labor_cost };

    switch (field) {
      case 'quantity':
      case 'working_days':
      case 'rate':
        changes[field] = e.target.value ? e.target.valueAsNumber : '';

        if (changes.quantity && changes.working_days && changes.rate) {
          changes['amount'] =
            changes.quantity * changes.working_days * changes.rate;
          errors['amount'] = null;
        }
        break;
      case 'amount':
        changes[field] = e.target.value ? e.target.valueAsNumber : '';
        break;
      case 'type':
        changes[field] = e.target.value;
        changes['quantity'] = '';
        changes['working_days'] = '';
        changes['rate'] = '';
        break;
      default:
        changes[field] = e.target.value;
    }

    const {
      errors: { [field]: error },
    } = field_validation.validateFields(changes);

    setLaborCost(changes);
    setErrors({ ...errors, [field]: error });
  };

  return (
    <Grid container style={{ width: 500, padding: 16 }}>
      <h4>{mode === 'add' ? 'New' : 'Update'} Labor Cost</h4>
      <Grid container>
        <FormInput container>
          <TextField
            label="Personnel"
            variant="outlined"
            error={Boolean(errors['personnel'])}
            helperText={errors['personnel']}
            value={personnel}
            onChange={handleOnChange('personnel')}
            style={{ width: '100%' }}
          />
        </FormInput>
        <FormInput container>
          <FormControl variant="outlined" style={{ width: '100%' }}>
            <InputLabel id="demo-simple-select-outlined-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={type}
              onChange={handleOnChange('type')}
              label="Type"
            >
              {PERSONNEL_TYPE.map(type => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </FormInput>
        {type === 'regular' && (
          <>
            <FormInput container>
              <Grid item xs={6} style={{ paddingRight: 4 }}>
                <TextField
                  label="# of worker"
                  variant="outlined"
                  type="number"
                  error={Boolean(errors['quantity'])}
                  helperText={errors['quantity']}
                  value={quantity}
                  onChange={handleOnChange('quantity')}
                  style={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={6} style={{ paddingLeft: 4 }}>
                <TextField
                  label="Rate per day"
                  variant="outlined"
                  type="number"
                  error={Boolean(errors['rate'])}
                  helperText={errors['rate']}
                  value={rate}
                  onChange={handleOnChange('rate')}
                  style={{ width: '100%' }}
                />
              </Grid>
            </FormInput>
            <FormInput container>
              <TextField
                label="Working days"
                variant="outlined"
                type="number"
                error={Boolean(errors['working_days'])}
                helperText={errors['working_days']}
                value={working_days}
                onChange={handleOnChange('working_days')}
                style={{ width: '100%' }}
              />
            </FormInput>
          </>
        )}
        <FormInput container>
          <TextField
            label="Total Amount"
            variant="outlined"
            type="number"
            error={Boolean(errors['amount'])}
            helperText={errors['amount']}
            value={amount}
            onChange={handleOnChange('amount')}
            style={{ width: '100%' }}
          />
        </FormInput>
        <Grid container justify="center" spacing={1}>
          <Grid item>
            <Button variant="outlined" onClick={onCancel}>
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              disabled={!isValid || saving}
              variant="contained"
              color="primary"
              onClick={() => onSave(labor_cost)}
            >
              {saving ? 'Saving...' : 'Save'}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

LaborCostForm.propTypes = {
  mode: oneOf(['add', 'edit']).isRequired,
  onCancel: func,
  onSave: func,
  costEstimate: object,
  saving: bool,
};

const mapStateToProps = state => {
  const {
    [NAMESPACE]: {
      costEstimates: { costEstimate, saving },
    },
  } = state;

  return {
    costEstimate,
    saving,
  };
};

export default connect(
  mapStateToProps,
  null,
)(LaborCostForm);
