import React from 'react';
import PropTypes from 'prop-types';
import Input from '../superclass/Input';

export default class HSelectBooleanCheckbox extends Input {
  static propTypes = {
    id: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    style: PropTypes.object,
    styleClass: PropTypes.string,
  };

  static defaultProps = {
    focus: false,
    type: 'text',
  };

  render() {
    return (<input id={this.state.id} name={this.state.id}
                   type="checkbox" onChange={this.handleChange}
                   defaultValue={this.value || false}/>);
  }
}

HSelectBooleanCheckbox.contextTypes = {
  updateMessages: PropTypes.func,
  getFormId: PropTypes.func,
  property: PropTypes.func,
};