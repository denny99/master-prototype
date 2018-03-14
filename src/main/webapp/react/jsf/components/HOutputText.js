import React from 'react';
import PropTypes from 'prop-types';
import JsfElement from '../superclass/JsfElement';

export default class HOutputText extends JsfElement {
  static propTypes = {
    id: PropTypes.string,
    styleClass: PropTypes.string,
    style: PropTypes.object,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    type: PropTypes.string,
    // should implement converter!
    converter: PropTypes.func,
    rendered: PropTypes.bool(),
  };

  render() {
    if (this.props.rendered) {
      return (<span className={this.props.styleClass} style={this.props.style}
                    id={this.state.id}>
      {this.props.hasOwnProperty('value') ? this.value : this.props.children}
    </span>);
    }
    return null;
  }
}

HOutputText.contextTypes = {
  getFormId: PropTypes.func,
};