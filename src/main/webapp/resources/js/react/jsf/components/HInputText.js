import React from 'react';
import PropTypes from 'prop-types';
import {Input} from '../superclass/Input';

export class HInputText extends Input {
  static propTypes = {
    focus: PropTypes.bool,
    id: PropTypes.string,
    value: PropTypes.string,
    styleClass: PropTypes.string,
    validatorMessage: PropTypes.string,
    requiredMessage: PropTypes.string,
    required: PropTypes.bool,
    style: PropTypes.object,
  };

  static defaultProps = {
    focus: false,
  };

  constructor(props, context) {
    super(props, context);

    // convert children
    React.Children.forEach(this.props.children, (child) => {
      let object = new child.type(child.props, child.context);
      this.state.children.push(object);
    });
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

  render() {
    return (
        <input id={this.state.id}
               name={this.state.id}
               ref={(input) => {
                 this.input = input;
               }}
               style={this.props.style}
               className={this.props.styleClass}
               value={this.context.property(this.props.value)}
               onChange={this.handleChange}>
        </input>);
  }
}

HInputText.contextTypes = {
  updateMessages: PropTypes.func,
  getFormId: PropTypes.func,
  data: PropTypes.object,
  property: PropTypes.func,
};