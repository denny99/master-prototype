import React from 'react';
import PropTypes from 'prop-types';

export default class IceOutputLink extends React.Component {
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
    };
  }

  render() {
    return (
        <a className={`iceOutLnk ${this.props.styleClass}`}
           href={this.props.value} id={this.props.id} type={this.props.type}>
          {this.props.children}
        </a>
    );
  }
}

IceOutputLink.contextTypes = {
  getFormId: PropTypes.func,
};
