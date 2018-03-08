import React from 'react';
import FValidateRegex from '../components/FValidateRegex';
import JsfElement from './JsfElement';

export default class Input extends JsfElement {
  constructor(props, context) {
    super(props, context);

    this.state.hasError = false;

    this.handleChange = this.handleChange.bind(this);
    this.validate = this.validate.bind(this);
  }

  /**
   * handle input change
   * @param {Event} event
   * @return {Promise<void>}
   */
  async handleChange(event) {
    this.value = event.target.value;
    const message = await this.validate();
    // propagate up to form itself
    this.context.updateMessages(this, message);

    if (this.ajax && this.ajax.props.event === 'change') {
      await this.ajax.call();
    }
  }

  /**
   * checks correctness of input
   * @return {Promise<string>}
   */
  async validate() {
    let hasError = false;
    let message = 'Error in the input field!';
    let currentValue = this.value;

    // check for validation childs
    for (let child of this.state.children) {
      if (child instanceof FValidateRegex) {
        // do regexp validation
        if (!child.validate(currentValue)) {
          hasError = true;
          message = this.props.validatorMessage;
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

    this.state.hasError = hasError;
    // this is async, so we manually update the state
    this.setState({
      hasError: hasError,
    });
    return message;
  }
}