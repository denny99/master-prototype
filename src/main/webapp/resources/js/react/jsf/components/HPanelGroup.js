import React from 'react';
import PropTypes from 'prop-types';

export default class HPanelGroup extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    layout: PropTypes.string,
    styleClass: PropTypes.string,
    style: PropTypes.object,
    rendered: PropTypes.bool,
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
    if (this.props.rendered !== false) {
      return (
          <div className={this.props.styleClass}
               id={this.state.id}
               style={this.props.style}>
            {this.props.children}
          </div>);
    } else {
      return <div/>;
    }
  }
}

HPanelGroup.contextTypes = {
  getFormId: PropTypes.func,
};
