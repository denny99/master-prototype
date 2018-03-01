import React from 'react';
import PropTypes from 'prop-types';

export class HMessage extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    for: PropTypes.string,
    styleClass: PropTypes.string,
    messageProps: PropTypes.object,
  };

  constructor(props, context) {
    super(props);
    this.state = {
      id: context.getFormId(this.props.id),
    };
  }

  render() {
    const props = this.props.messageProps[this.props.for];
    return (
        <span className={props.show ? this.props.styleClass : ''}
              id={this.state.id}>
          {props.show ? props.message : <span id={this.state.id}/>}
      </span>);
  }
}

HMessage.contextTypes = {
  getFormId: PropTypes.func,
};
