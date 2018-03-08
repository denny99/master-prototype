import React from 'react';
import PropTypes from 'prop-types';
import JsfElement from '../superclass/JsfElement';

export default class IceOutputText extends JsfElement {
  static propTypes = {
    id: PropTypes.string,
    value: PropTypes.string,
    styleClass: PropTypes.string,
    type: PropTypes.string,
  };

  render() {
    let value = this.value;
    if (this.converter) {
      value = this.converter.convert(this.value);
    }

    return (
        <span className={`iceOutTxt ${this.props.styleClass}`}
              id={this.state.id}>{this.props.hasOwnProperty('value') ?
            value :
            this.props.children}</span>
    );
  }
}

IceOutputText.contextTypes = {
  getFormId: PropTypes.func,
  property: PropTypes.func,
};
