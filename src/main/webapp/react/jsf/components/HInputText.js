import React from 'react';
import PropTypes from 'prop-types';
import Input from '../superclass/Input';

export default class HInputText extends Input {
  static propTypes = {
    focus: PropTypes.bool,
    id: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    maxLength: PropTypes.number,
    disabled: PropTypes.bool,
    style: PropTypes.object,
    styleClass: PropTypes.string,
    type: PropTypes.string,
    validator: PropTypes.func,
    validatorMessage: PropTypes.string,
    required: PropTypes.bool,
    requiredMessage: PropTypes.string,
    converter: PropTypes.func,
    converterMessage: PropTypes.string,
    onchange: PropTypes.func,
  };

  static defaultProps = {
    focus: false,
    type: 'text',
  };

  /**
   * auto-focus after build
   */
  async componentDidMount() {
    await super.componentDidMount();
    if (this.props.focus) {
      this.input.focus();
      // set cursor to the end of input
      this.input.setSelectionRange(this.input.value.length,
          this.input.value.length);
    }
  }

  render() {
    let elem = (
        <input id={this.state.id}
               name={this.state.id}
               disabled={this.props.disabled}
               type={this.props.type || 'text'}
               ref={(input) => {
                 this.input = input;
               }}
               style={this.props.style}
               className={this.props.styleClass}
               value={this.value}
               onChange={this.handleChange}>
        </input>);

    let props = this.handleAjax();

    return React.cloneElement(elem, props);
  }
}

HInputText.contextTypes = {
  updateMessages: PropTypes.func,
  getFormId: PropTypes.func,
  property: PropTypes.func,
};