/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import React from 'react';
import { object, string, func, bool } from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import {
  DetailLabel,
  FormInput,
  StyledInputLabel,
  StyledTextField,
  ErrorMessage,
} from '../../styles';

function Details(props) {
  const { errors, details, onChange, onBlur, field, label, disabled } = props;
  const {
    contact_person = '',
    contact_number = '',
  } = details;
  
 if (field === 'supplier'){
    return (

      <Grid container style={{ border: '1px solid #ddd', marginTop: 32 }}>
        <Grid container style={{ backgroundColor: '#373c4d', color: '#fff' }}>
          <DetailLabel>{label}</DetailLabel>
        </Grid>
        <Grid container style={{ padding: '16px 0px', display:'inline-block' }} >
          <Grid item xs={10} >
            <FormInput >
              <StyledInputLabel>Contact Person</StyledInputLabel>
              <StyledTextField
                disabled={disabled}
                variant="outlined"
                size="small"
                error={Boolean(errors[`${field}.contact_person`])}
                value={contact_person}
                onChange={onChange(`${field}.contact_person`)}
                onBlur={onBlur(`${field}.contact_person`)}
              />
              <ErrorMessage>{errors[`${field}.contact_person`]}</ErrorMessage>
            </FormInput>
          </Grid>
          <Grid item xs={10}>
            <FormInput>
              <StyledInputLabel>Contact Number</StyledInputLabel>
              <StyledTextField
                disabled={disabled}
                variant="outlined"
                size="small"
                error={Boolean(errors[`${field}.contact_number`])}
                value={contact_number}
                onChange={onChange(`${field}.contact_number`)}
                onBlur={onBlur(`${field}.contact_number`)}
              />
              <ErrorMessage>{errors[`${field}.contact_number`]}</ErrorMessage>
            </FormInput>
          </Grid>
        </Grid>
      </Grid>
    );
  }
  else{
    return (
      <Grid container style={{ border: '1px solid #ddd', marginTop: 32 }}>
        <Grid container style={{ backgroundColor: '#373c4d', color: '#fff' }}>
          <DetailLabel>{label}</DetailLabel>
        </Grid>
        <Grid container style={{ padding: '16px 0px', color:'rgba(0, 0, 0, 0.54)', display:'inline-block', fontSize:"12px"}} >
          <Grid item xs={8} >
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel 
                  style={{ marginBottom:'25px'}}
                  value="start"
                  control={<Checkbox color="primary" />}
                  label={<span style={{ fontSize: '13px' }}>Delivery to Site</span>}
                  labelPlacement="start"
                />
              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item xs={8} >
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  value="start" 
                  control={<Checkbox color="primary" />}
                  label={<span style={{ fontSize: '13px' }}>Delivery to Office</span>}
                  labelPlacement="start"
                />
              </FormGroup>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

Details.propTypes = {
  errors: object,
  details: object,
  onChange: func,
  onBlur: func,
  field: string,
  label: string,
  disabled: bool,
};

export default Details;
