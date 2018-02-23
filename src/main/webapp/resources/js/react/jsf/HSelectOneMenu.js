import React from 'react';
import PropTypes from 'prop-types';
import {Input} from './superclass/Input';

export class HSelectOneMenu extends Input {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
        <select className={this.props.styleClass} id={this.state.id}
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
  data: PropTypes.object,
  property: PropTypes.func,
};