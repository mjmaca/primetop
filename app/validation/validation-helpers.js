/* eslint-disable no-param-reassign */
export const validateLength = (value, label, opts = {}) => {
  const { min = 1, max } = opts;

  value = value.trim();

  const { length } = value;

  label = `${label.charAt(0).toUpperCase()}${label.slice(1)}`;
  label = label.split('_').join(' ');

  if (max && length > max) {
    return `${label} cannot be more than ${max} characters`;
  }

  if (min && length < min) {
    return `${label} must be at least ${min} character`;
  }

  return undefined;
};
