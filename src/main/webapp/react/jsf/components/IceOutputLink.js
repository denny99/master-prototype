import React from 'react';
import PropTypes from 'prop-types';
import JsfElement from '../superclass/JsfElement';

export default class IceOutputLink extends JsfElement {
  static propTypes = {
    id: PropTypes.string,
    value: PropTypes.string.isRequired,
    styleClass: PropTypes.string,
    type: PropTypes.string,
  };

  render() {
    return (
        <a className={`iceOutLnk ${this.props.styleClass}`}
           href={this.value} id={this.props.id} type={this.props.type}>
          {this.props.children}
        </a>
    );
  }
}

IceOutputLink.contextTypes = {
  getFormId: PropTypes.func,
};
