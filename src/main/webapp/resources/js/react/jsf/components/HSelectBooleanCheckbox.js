import React from 'react';
import PropTypes from 'prop-types';
import JsfElement from '../superclass/JsfElement';

export default class HSelectBooleanCheckbox extends JsfElement {
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

  handleChange(event) {
    this.value = event.target.value;
  }

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