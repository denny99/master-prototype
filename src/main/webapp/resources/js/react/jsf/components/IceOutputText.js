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

  constructor(props, context) {
    super(props, context);
    this.state = {
      id: (context.getFormId) ?
          context.getFormId(this.props.id) :
          this.props.id,
      value: this.props.value,
    };

    React.Children.forEach(this.props.children, (child => {
      if (child.type === FConvertNumber) {
        this.converter = new child.type(child.props, child.context);
      }
    }));
  }

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
