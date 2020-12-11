/* eslint-disable array-callback-return */
/* eslint-disable camelcase */
/* eslint-disable consistent-return */
import { isEmpty, isObjectLike } from 'lodash';
import { validateLength } from './validation-helpers';

/**
 * This field validation
 * accepts model (it can be hierarchical/tree)
 *
 * the validation will return a boolean isValid and errors
 * containing the key and error message
 *
 * ________________________________________________________
 * NOTE:
 * If you pass multi-level model,
 * you will need to rearrange your data also in multi-level
 * but the error return is still flat
 * exampale: { 'config.user.name': 'error of name under config.user' }
 *
 * Each validation can be overriden by adding validate() function
 * to the item
 * example: { url: { validate: () => //perform your own validation } }
 *
 */

export default class FieldValidation {
  constructor(model) {
    this.model = model;
  }

  model = {};

  static getErrorMessage = params => {
    const { field, current_data = {}, original_data = {}, model = {} } = params;

    if (model[field]) {
      const { validate, min, max } = model[field];

      /** priority to perform override validation */
      if (validate) {
        return validate(current_data, original_data);
      }

      /** otherwise, perform normal validation */
      return validateLength(current_data[field] || '', field, {
        min,
        max,
      });
    }
  };

  static recursiveCheck = params => {
    const {
      model,
      current_data = {},
      original_data = {},
      parent_field = '',
    } = params;

    let { errors = {} } = params;

    Object.keys(model).forEach(field => {
      let error;
      const hasChild = Object.keys(model[field]).find(child_field => {
        if (isObjectLike(model[field][child_field])) {
          return true;
        }
      });

      if (hasChild) {
        error = this.recursiveCheck({
          model: model[field],
          current_data: current_data[field],
          original_data,
          errors: {},
          parent_field: `${parent_field}${field}.`,
        });

        if (!isEmpty(error)) {
          errors = { ...errors, ...error };
        }
      } else {
        error = this.getErrorMessage({
          field,
          current_data,
          original_data,
          model,
        });

        if (!isEmpty(error)) {
          errors[`${parent_field}${field}`] = error;
        }
      }
    });

    return errors;
  };

  validateFields = data => {
    const errors = FieldValidation.recursiveCheck({
      model: this.model,
      current_data: data,
      original_data: data,
    });

    return { isValid: isEmpty(errors), errors };
  };
}
