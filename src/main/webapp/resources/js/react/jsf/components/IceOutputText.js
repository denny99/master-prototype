import React from 'react';
import PropTypes from 'prop-types';
import FConvertNumber from './FConvertNumber';

export default class IceOutputText extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    value: PropTypes.string.isRequired,
    styleClass: PropTypes.string,
    type: PropTypes.string,
  };

  render() {
    if (this.converter) {
      this.state.value = this.converter.convert(this.state.value);
    }
    return (
        <span className={`iceOutTxt ${this.props.styleClass}`}
              id={this.state.id}>{this.state.value}</span>
    );
  }
}

IceOutputText.contextTypes = {
  getFormId: PropTypes.func,
};
