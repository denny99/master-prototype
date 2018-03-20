import React from 'react';
import PropTypes from 'prop-types';
import HCommandButton from './HCommandButton';

export default class IceCommandButton extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    value: PropTypes.string.isRequired,
    immediate: PropTypes.bool,
    style: PropTypes.object,
    styleClass: PropTypes.string,
    action: PropTypes.func,
    actionArgument: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  };

  render() {
    return (
        <HCommandButton id={this.props.id} value={this.props.value}
                        immediate={this.props.immediate}
                        style={this.props.style}
                        styleClass={`iceCmdBtn ${this.props.styleClass}`}
                        action={this.props.action}
                        actionArgument={this.props.actionArgument}/>
    );
  }
}

HCommandButton.contextTypes = {
  getFormId: PropTypes.func,
};