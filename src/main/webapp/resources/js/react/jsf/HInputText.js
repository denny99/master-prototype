import React from 'react';
import PropTypes from 'prop-types';
import {FValidateRegex} from './FValidateRegex';

export class HInputText extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      hasError: false,
      id: context.getFormId(this.props.id),
      children: [],
    };

    // convert children
    React.Children.forEach(this.props.children, (child) => {
      let object = new child.type(child.props, child.context);
      this.state.children.push(object);
    });

    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * auto-focus after build
   */
  componentDidMount() {
    if (this.props.focus) {
      this.input.focus();
      // set cursor to the end of input
      this.input.setSelectionRange(this.input.value.length,
          this.input.value.length);
    }
  }

  /**
   * handle input change
   * @param {Event} event
   */
  handleChange(event) {
    this.context.property(this.props.value, event.target.value);
    const message = this.validate();
    // propagate up to form itself
    this.context.updateMessages(this, message);
  }

  render() {
    return (
        <input id={this.state.id}
               ref={(input) => {
                 this.input = input;
               }}
               className={this.props.styleClass}
               value={this.context.property(this.props.value)}
               onChange={this.handleChange}>
        </input>);
  }

  /**
   * checks correctness of input
   * @return {string}
   */
  validate() {
    let hasError = false;
    let message = 'Error in the input field!';
    for (let child of this.state.children) {
      if (child instanceof FValidateRegex) {
        // do regexp validation
        if (!child.validate(this.context.property(this.props.value))) {
          hasError = true;
          message = this.props.validatorMessage;
        }
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

HInputText.contextTypes = {
  updateMessages: PropTypes.func,
  getFormId: PropTypes.func,
  data: PropTypes.object,
  property: PropTypes.func,
};