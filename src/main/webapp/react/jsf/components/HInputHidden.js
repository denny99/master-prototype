import React from 'react';
import PropTypes from 'prop-types';
import HInputText from './HInputText';
import Input from '../superclass/Input';

export default class HInputHidden extends Input {
  static propTypes = {
    id: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    style: PropTypes.object,
    styleClass: PropTypes.string,
    validator: PropTypes.func,
    validatorMessage: PropTypes.string,
    required: PropTypes.bool,
    requiredMessage: PropTypes.string,
    converter: PropTypes.func,
    converterMessage: PropTypes.string,
    onchange: PropTypes.func,
  };

  render() {
    let props = JSON.parse(JSON.stringify(this.props));
    props.type = 'hidden';
    return React.createElement(HInputText, props, this.props.children);
  }
}

HInputHidden.contextTypes = {
  updateMessages: PropTypes.func,
  getFormId: PropTypes.func,
  property: PropTypes.func,
};