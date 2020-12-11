/* eslint-disable camelcase */
import React from 'react';
import { string, func, bool } from 'prop-types';

import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

import { PAYMENT_METHODS } from '../../../../constants';

import { SectionLabel } from '../../styles';
import {
  StyledPaymentInfo,
  PaymentMethod,
  PaymentTerms,
  Divider,
  Comments,
} from './styles';

function PaymentInfo(props) {
  const { payment_method, payment_terms, comments, onChange, disabled } = props;

  return (
    <StyledPaymentInfo>
      <SectionLabel>Payment Details</SectionLabel>
      <PaymentMethod>
        <div className="label">Payment Method:</div>
        <div>
          {PAYMENT_METHODS.map(method => (
            <FormControlLabel
              style={{ marginRight: 8 }}
              key={method}
              control={
                <Radio
                  disabled={disabled}
                  label={method}
                  checked={payment_method === method}
                  onChange={onChange('payment_method')}
                  value={method}
                  color="default"
                  name="payment_method"
                  size="small"
                />
              }
              label={method}
              labelPlacement="start"
            />
          ))}
        </div>
      </PaymentMethod>
      <PaymentTerms>
        <div className="label">Payment Terms:</div>
        <div>
          <TextareaAutosize
            disabled={disabled}
            rowsMin={5}
            style={{ width: '100%' }}
            value={payment_terms}
            onChange={onChange('payment_terms')}
          />
        </div>
      </PaymentTerms>
      <Divider />
      <Comments>
        <div className="label">Comments or Special Instructions</div>
        <TextareaAutosize
          disabled={disabled}
          rowsMin={5}
          style={{ width: '100%' }}
          placeholder="Write your comment here..."
          value={comments}
          onChange={onChange('comments')}
        />
      </Comments>
    </StyledPaymentInfo>
  );
}

PaymentInfo.propTypes = {
  payment_method: string,
  payment_terms: string,
  comments: string,
  onChange: func,
  disabled: bool,
};

export default PaymentInfo;
