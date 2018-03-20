import React from 'react';
import PropTypes from 'prop-types';
import SelectOne from '../superclass/SelectOne';

export default class HSelectOneMenu extends SelectOne {
  static propTypes = {
    id: PropTypes.string,
    value: PropTypes.string,
    size: PropTypes.number,
    styleClass: PropTypes.string,
    style: PropTypes.object,
    requiredMessage: PropTypes.string,
    required: PropTypes.bool,
  };

  render() {
    return (
        <select defaultValue={this.value} className={this.props.styleClass}
                id={this.state.id}
                name={this.state.id} size={this.props.size}
                style={this.props.style}
                onChange={this.handleChange}
        >
          {this.props.children}
        </select>);
  }
}

HSelectOneMenu.contextTypes = {
  updateMessages: PropTypes.func,
  getFormId: PropTypes.func,
  property: PropTypes.func,
};
HSelectOneMenu.childContextTypes = {
  updateMessages: PropTypes.func,
  getFormId: PropTypes.func,
  property: PropTypes.func,
  currentValue: PropTypes.any,
  parent: PropTypes.instanceOf(HSelectOneMenu),
};
