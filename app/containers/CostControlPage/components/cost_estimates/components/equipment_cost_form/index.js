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

import { EQUIPMENT_COST_MODEL } from '../../constants';
import {
  NAMESPACE,
  EQUIPMENT_ACQUISITION_TYPE,
  EQUIPMENT_USAGE_UNIT,
} from '../../../../constants';

function EquipmentCostForm(props) {
  const { mode, onCancel, onSave, costEstimate, saving } = props;
  const [errors, setErrors] = useState({});
  const [equipment_cost, setEquipmentCost] = useState({ ...costEstimate });
  const field_validation = new FieldValidation(EQUIPMENT_COST_MODEL);
  const { isValid } = field_validation.validateFields(equipment_cost);

  const {
    name = '',
    acquisition_type = '',
    quantity = '',
    usage = '',
    unit = '',
    price_per_unit = '',
    amount = '', // quantity * usage * price_per_unit
  } = equipment_cost;

  const handleOnChange = field => e => {
    const changes = { ...equipment_cost };
    switch (field) {
      case 'quantity':
      case 'usage':
      case 'price_per_unit':
        changes[field] = e.target.value ? e.target.valueAsNumber : '';
        errors['amount'] = null;

        // eslint-disable-next-line default-case
        switch (changes['acquisition_type']) {
          case 'rent':
            if (changes.quantity && changes.usage && changes.price_per_unit) {
              changes['amount'] =
                changes.quantity * changes.usage * changes.price_per_unit;
            }
            break;
          case 'buy':
            if (changes.quantity && changes.price_per_unit) {
              changes['amount'] = changes.quantity * changes.price_per_unit;
            }
            break;
        }
        break;
      case 'amount':
        changes[field] = e.target.value ? e.target.valueAsNumber : '';
        break;
      case 'acquisition_type':
        changes[field] = e.target.value;
        changes['amount'] = '';
        changes['usage'] = '';
        changes['unit'] = '';
        changes['price_per_unit'] = '';
        break;
      default:
        changes[field] = e.target.value;
    }

    const {
      errors: { [field]: error },
    } = field_validation.validateFields(changes);

    setEquipmentCost(changes);
    setErrors({ ...errors, [field]: error });
  };

  return (
    <Grid container style={{ width: 500, padding: 16 }}>
      <h4>{mode === 'add' ? 'New' : 'Update'} Equipment Cost</h4>
      <Grid container>
        <FormInput container>
          <TextField
            label="Equipment or Tools"
            variant="outlined"
            error={Boolean(errors['name'])}
            helperText={errors['name']}
            value={name}
            onChange={handleOnChange('name')}
            style={{ width: '100%' }}
          />
        </FormInput>
        <FormInput container>
          <FormControl variant="outlined" style={{ width: '100%' }}>
            <InputLabel id="demo-simple-select-outlined-label">
              Acquisition Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={acquisition_type}
              onChange={handleOnChange('acquisition_type')}
              label="Acquisition Type"
            >
              {EQUIPMENT_ACQUISITION_TYPE.map(type => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </FormInput>
        <FormInput container>
          <TextField
            label="QTY"
            variant="outlined"
            type="number"
            error={Boolean(errors['quantity'])}
            helperText={errors['quantity']}
            value={quantity}
            onChange={handleOnChange('quantity')}
            style={{ width: '100%' }}
          />
        </FormInput>
        {acquisition_type === 'rent' && (
          <FormInput container>
            <Grid item xs={6} style={{ paddingRight: 4 }}>
              <FormControl variant="outlined" style={{ width: '100%' }}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Operation
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={unit}
                  onChange={handleOnChange('unit')}
                  label="Operation"
                >
                  {EQUIPMENT_USAGE_UNIT.map(unit => (
                    <MenuItem key={unit} value={unit}>
                      {unit}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} style={{ paddingLeft: 4 }}>
              <TextField
                label={unit ? `how many ${unit}(s)?` : ''}
                variant="outlined"
                type="number"
                error={Boolean(errors['usage'])}
                helperText={errors['usage']}
                value={usage}
                onChange={handleOnChange('usage')}
                style={{ width: '100%' }}
              />
            </Grid>
          </FormInput>
        )}
        <FormInput container>
          <TextField
            label={`Price per ${unit || 'unit'}`}
            variant="outlined"
            type="number"
            error={Boolean(errors['price_per_unit'])}
            helperText={errors['price_per_unit']}
            value={price_per_unit}
            onChange={handleOnChange('price_per_unit')}
            style={{ width: '100%' }}
          />
        </FormInput>
        <FormInput container>
          <TextField
            disabled
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
              onClick={() => onSave(equipment_cost)}
            >
              {saving ? 'Saving...' : 'Save'}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

EquipmentCostForm.propTypes = {
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
)(EquipmentCostForm);
