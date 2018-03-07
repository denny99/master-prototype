import React from 'react';
import PropTypes from 'prop-types';
import JsfElement from '../superclass/JsfElement';

export default class HOutputLabel extends JsfElement {
  static propTypes = {
    id: PropTypes.string,
    for: PropTypes.string,
    style: PropTypes.obj,
    styleClass: PropTypes.string,
  };

  render() {
    let forId = this.context ?
        this.context.getFormId(this.props.for) :
        this.props.for;
    return (
        <label className={this.props.styleClass} htmlFor={forId}
               id={this.state.id} style={this.props.style}>
          {this.props.children}</label>
    );
  }
}

HOutputLabel.contextTypes = {
  getFormId: PropTypes.func,
};
