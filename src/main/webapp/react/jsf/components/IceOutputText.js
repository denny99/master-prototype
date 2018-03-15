import React from 'react';
import PropTypes from 'prop-types';
import HOutputText from './HOutputText';

export default class IceOutputText extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    value: PropTypes.string,
    styleClass: PropTypes.string,
    type: PropTypes.string,
    converter: PropTypes.func,
  };

  render() {
    return (
        <HOutputText type={this.props.type} value={this.props.value}
                     converter={this.props.converter}
                     styleClass={`iceOutTxt ${this.props.styleClass}`}
                     id={this.props.id}>{this.props.children}</HOutputText>
    );
  }
}

IceOutputText.contextTypes = {
  getFormId: PropTypes.func,
  property: PropTypes.func,
};
