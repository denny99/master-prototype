import React from 'react';
import PropTypes from 'prop-types';
import Input from '../superclass/Input';

export default class HSelectBooleanCheckbox extends Input {
  static propTypes = {
    id: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    style: PropTypes.object,
    styleClass: PropTypes.string,
    validator: PropTypes.string,
  };

  async handleChange(event) {
    return await super.handleChange({
      target: {
        value: event.target.checked,
      },
    });
  }

  render() {
    return (<input className={this.props.styleClass} id={this.state.id}
                   name={this.state.id}
                   type="checkbox" onChange={this.handleChange}
                   defaultValue={this.value || false}/>);
  }
}

HSelectBooleanCheckbox.contextTypes = {
  updateMessages: PropTypes.func,
  getFormId: PropTypes.func,
  property: PropTypes.func,
};