import React from 'react';
import PropTypes from 'prop-types';

export default class HOutputLabel extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    for: PropTypes.string,
    style: PropTypes.obj,
    styleClass: PropTypes.string,
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
