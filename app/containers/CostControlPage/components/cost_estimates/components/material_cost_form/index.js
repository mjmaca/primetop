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

import { MATERIAL_COST_MODEL } from '../../constants';
import { MATERIAL_UNITS, NAMESPACE } from '../../../../constants';

function MaterialCostForm(props) {
  const { mode, onCancel, onSave, costEstimate, saving } = props;
  const [errors, setErrors] = useState({});
  const [material_cost, setMaterialCost] = useState({ ...costEstimate });
  const field_validation = new FieldValidation(MATERIAL_COST_MODEL);
  const { isValid } = field_validation.validateFields(material_cost);

  const {
    name = '',
    description = '',
    quantity = '',
    unit = '',
    price_per_unit = '',
    amount = '', // quantity * price_per_unit
  } = material_cost;

  const handleOnChange = field => e => {
    const changes = { ...material_cost };
    switch (field) {
      case 'quantity':
      case 'price_per_unit':
        changes[field] = e.target.value ? e.target.valueAsNumber : '';

        if (changes.quantity && changes.price_per_unit) {
          changes['amount'] = changes.quantity * changes.price_per_unit;
          errors['amount'] = null;
        }
        break;
      case 'amount':
        changes[field] = e.target.value ? e.target.valueAsNumber : '';
        break;
      default:
        changes[field] = e.target.value;
    }

    const {
      errors: { [field]: error },
    } = field_validation.validateFields(changes);

    setMaterialCost(changes);
    setErrors({ ...errors, [field]: error });
  };

  return (
    <Grid container style={{ width: 500, padding: 16 }}>
      <h4>{mode === 'add' ? 'New' : 'Update'} Material Cost</h4>
      <Grid container>
        <FormInput container>
          <TextField
            label="Material"
            variant="outlined"
            error={Boolean(errors['name'])}
            helperText={errors['name']}
            value={name}
            onChange={handleOnChange('name')}
            style={{ width: '100%' }}
          />
        </FormInput>
        <FormInput container>
          <TextField
            label="Description"
            variant="outlined"
            error={Boolean(errors['description'])}
            helperText={errors['description']}
            value={description}
            onChange={handleOnChange('description')}
            style={{ width: '100%' }}
          />
        </FormInput>
        <FormInput container>
          <Grid item xs={6} style={{ paddingRight: 4 }}>
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
          </Grid>
          <Grid item xs={6} style={{ paddingLeft: 4 }}>
            <FormControl variant="outlined" style={{ width: '100%' }}>
              <InputLabel id="demo-simple-select-outlined-label">
                Unit
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={unit}
                onChange={handleOnChange('unit')}
                label="Unit"
              >
                {MATERIAL_UNITS.map(unit => (
                  <MenuItem key={unit} value={unit}>
                    {unit}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </FormInput>
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
              onClick={() => onSave(material_cost)}
            >
              {saving ? 'Saving...' : 'Save'}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

MaterialCostForm.propTypes = {
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
)(MaterialCostForm);
