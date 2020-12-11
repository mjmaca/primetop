/* eslint-disable camelcase */
import { sanitize, truncateDecimal } from './numbers';

export const getCostBreakdown = item => {
  /** this price is from cost estimation */
  const price_per_unit = sanitize(item.price_per_unit);
  /** this is the quantity input from PO NOT from cost estimation */
  const quantity = sanitize(item.quantity);
  const working_days = sanitize(item.working_days);
  const rate = sanitize(item.rate);
  /** this price is from PO, we can assume this is the price from supplier */
  const actual_price_per_unit = sanitize(item.actual_price_per_unit);
  /** item.discount was written in % */
  const discount_percent = sanitize(item.discount);
  /** total amount is quantity * actual_price_per_unit - discount */
  const total_amount = sanitize(item.amount);

  const actual_amount = truncateDecimal(actual_price_per_unit * quantity);
  const estimated_amount = truncateDecimal(quantity * price_per_unit);
  const discount = truncateDecimal(actual_amount * (discount_percent / 100));

  /** diff is the difference between the estimated and the actual price from supplier */
  const diff = truncateDecimal(estimated_amount - actual_amount);

  return {
    quantity,
    working_days,
    rate,
    actual_price_per_unit,
    discount_percent,
    total_amount,
    actual_amount,
    estimated_amount,
    discount,
    diff,
  };
};
