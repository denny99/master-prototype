import React from 'react';
import PropTypes from 'prop-types';
import JsfElement from '../superclass/JsfElement';

export default class HOutputText extends JsfElement {
  static propTypes = {
    id: PropTypes.string,
    styleClass: PropTypes.string,
    style: PropTypes.object,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    // should implement converter!
    converter: PropTypes.func,
  };

  render() {
    return (<span className={this.props.styleClass} style={this.props.style}
                  id={this.state.id}>
      {this.value}
    </span>);
  }
}

HOutputText.contextTypes = {
  getFormId: PropTypes.func,
};