/* eslint-disable camelcase */
import React, { useMemo } from 'react';
import { number } from 'prop-types';

import { SectionLabel } from '../../styles';
import { StyledCostBreakdown, BreakdownItem } from './styles';

function CostBreakdown(props) {
  const { sub_total, total_discount, grand_total } = props;

  return useMemo(
    () => (
      <StyledCostBreakdown>
        <SectionLabel>Breakdown of Cost</SectionLabel>
        <BreakdownItem>
          <div>Subtotal</div>
          <div>₱ {sub_total ? sub_total.toLocaleString() : '0.00'}</div>
        </BreakdownItem>
        <BreakdownItem>
          <div>Total Discount</div>
          <div>n/a</div>
        </BreakdownItem>
        <BreakdownItem>
          <div>Grand Total</div>
          <div>₱ {grand_total ? grand_total.toLocaleString() : '0.00'}</div>
        </BreakdownItem>
      </StyledCostBreakdown>
    ),
    [sub_total, total_discount, grand_total],
  );
}

CostBreakdown.propTypes = {
  sub_total: number,
  total_discount: number,
  grand_total: number,
};

export default CostBreakdown;
