import React from 'react';
import {FValidateRegex} from '../components/FValidateRegex';

export class Input extends React.Component {
  constructor(props, context) {
    super(props);

    this.state = {
      hasError: false,
      id: context.getFormId(this.props.id),
      children: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.validate = this.validate.bind(this);
  }

  get value() {
    return this.context.property(this.props.value);
  }

  set value(o) {
    return this.context.property(this.props.value, o);
  }



  /**
   * handle input change
   * @param {Event} event
   */
  handleChange(event) {
    this.value = event.target.value;
    const message = this.validate();
    // propagate up to form itself
    this.context.updateMessages(this, message);
  }

  /**
   * checks correctness of input
   * @return {string}
   */
  validate() {
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
    if (this.props.required) {
      if (currentValue === '' || currentValue === undefined) {
        hasError = true;
        message = this.props.requiredMessage;
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