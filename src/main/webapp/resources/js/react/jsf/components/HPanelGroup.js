import React from 'react';
import PropTypes from 'prop-types';
import JsfElement from '../superclass/JsfElement';

export default class HPanelGroup extends JsfElement {
  static propTypes = {
    id: PropTypes.string,
    layout: PropTypes.string,
    styleClass: PropTypes.string,
    style: PropTypes.object,
    rendered: PropTypes.bool,
  };

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
