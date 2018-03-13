import React from 'react';
import FValidateRegex from '../components/FValidateRegex';
import JsfElement from './JsfElement';

export default class Input extends JsfElement {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);
    this.validate = this.validate.bind(this);
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
    value = this.converter && typeof value === 'object' ?
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
      this.converterError = false;
    } catch (e) {
      this.converterError = true;
      this.hasError = true;
      this.errorMessage = this.props.converterMessage;
      this.context.updateMessages(this);
    } finally {
      this.context.property(this.props.value, value);
    }
  }

  componentDidMount() {
    // make sure input is marked as error after init and empty input
    if (this.props.required &&
        (this.value === undefined || this.value === null || this.value ===
            '')) {
      this.hasError = true;
      this.errorMessage = this.props.requiredMessage;
      this.context.updateMessages(this, true);
    }
  }

  async componentDidUpdate() {
    // only do further validations if format is correct
    if (!this.converterError) {
      let response = await this.validate();

      if (this.hasError !== response.hasError ||
          this.errorMessage !== response.errorMessage) {
        this.hasError = response.hasError;
        this.errorMessage = response.errorMessage;
        this.context.updateMessages(this);
      } else {
        this.hasError = response.hasError;
        this.errorMessage = response.errorMessage;
      }
    }
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
      if (currentValue === '' || currentValue === undefined) {
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
      let response = await this.props.validator();
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