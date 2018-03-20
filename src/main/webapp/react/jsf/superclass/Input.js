import React from 'react';
import FValidateRegex from '../components/FValidateRegex';
import JsfElement from './JsfElement';
import * as _ from 'lodash';

export default class Input extends JsfElement {
  constructor(props, context) {
    super(props, context);

    this.hasError = false;
    this.externalError = false;
    this.initialValidation = true;
    this.errorMessage = '';

    this.handleChange = this.handleChange.bind(this);
    this.validate = this.validate.bind(this);
    this.setError = this.setError.bind(this);
    this.setExternalError = this.setExternalError.bind(this);
  }

  /**
   * @return {object| number | string}
   */
  get value() {
    // only inputs write back to form element via prop notation
    let value = (typeof this.props.value === 'string') ?
        this.context.property(this.props.value) :
        this.props.value;

    // only convert if requested input not empty
    value = this.converter && typeof value !== 'string' ?
        this.converter.getAsString(value) :
        value;

    return value;
  }

  /**
   *
   * @param {object| number | string} o
   */
  set value(o) {
    let value = o;
    try {
      value = this.converter && typeof o !== 'object' ?
          this.converter.getAsObject(o) :
          o;
    } catch (e) {
      this.setError(true, this.props.converterMessage);
    } finally {
      // only a property annotation has to write into the context object (e.g.: bla.blub)
      if (typeof this.props.value === 'string') {
        this.context.property(this.props.value, value);
      }
    }
  }

  async componentDidMount() {
    if (_.isEmpty(this.value)) {
      this.value = '';
    }

    await this.componentDidUpdate();
    this.initialValidation = false;
  }

  async componentDidUpdate() {
    // only do further validations if format is correct
    if (!this.converterError() && !this.externalError) {
      let response = await this.validate();

      if (this.hasError !== response.hasError ||
          this.errorMessage !== response.errorMessage) {
        this.setError(response.hasError, response.errorMessage);
      } else {
        this.hasError = response.hasError;
        this.errorMessage = response.errorMessage;
      }
    }
  }

  /**
   *
   * @param {boolean} hasError
   * @param {string} [message]
   */
  setExternalError(hasError, message) {
    this.externalError = hasError;
    this.setError(hasError, message);
  }

  /**
   *
   * @param {boolean} hasError
   * @param {string} [message]
   */
  setError(hasError, message) {
    this.hasError = hasError;
    this.errorMessage = message ? message : '';
    this.context.updateMessages(this, this.initialValidation);
  }

  /**
   * handle input change
   * @param {Event} event
   * @return {Promise<void>}
   */
  async handleChange(event) {
    this.value = event.target.value;

    if (this.ajax && this.ajax.props.event === 'change') {
      await this.ajax.call();
    }

    // add on change event
    if (this.props.hasOwnProperty('onchange')) {
      await this.props.onchange();
    }

  }

  /**
   * checks correctness of input
   * @return {Promise<{hasError: boolean, errorMessage: string}>}
   */
  async validate() {
    let hasError = false;
    let message = 'Error in the input field!';
    let currentValue = this.value;

    // check for validation children
    if (!hasError) {
      for (let child of this.state.children) {
        if (child instanceof FValidateRegex) {
          // do regexp validation
          if (!child.validate(currentValue)) {
            hasError = true;
            message = this.props.validatorMessage;
          }
        }
      }
    }

    // check for validation props
    if (this.props.required && !hasError) {
      if (_.isEmpty(currentValue)) {
        hasError = true;
        message = this.props.requiredMessage;
      }
    }

    if (this.props.maxLength && !hasError) {
      if (currentValue && currentValue.length > this.props.maxLength) {
        hasError = true;
        message = `Max ${this.props.maxLength} Characters allowed`;
      }
    }

    if (this.props.validator && !hasError) {
      let response = await this.props.validator(this);
      if (response.error) {
        hasError = true;
        message = response.message;
      }
    }

    return {
      hasError: hasError,
      errorMessage: hasError ? message : '',
    };
  }
}