import React from 'react';
import PropTypes from 'prop-types';
import JsfElement from '../superclass/JsfElement';

export default class HMessage extends JsfElement {
  static propTypes = {
    id: PropTypes.string,
    for: PropTypes.string.isRequired,
    styleClass: PropTypes.string,
  };

  constructor(props, context) {
    super(props, context);
    context.initMessage(this.props.for);
  }

  render() {
    const props = this.context.getMessage(this.props.for);
    let show = props.show && (this.context.activeElement === this.props.for ||
        this.context.activeElement === 'all');
    return (
        <span className={show ? this.props.styleClass : ''}
              id={this.state.id}>
          {show ? props.message : <span id={this.state.id}/>}
      </span>);
  }
}

HMessage.contextTypes = {
  getFormId: PropTypes.func,
  initMessage: PropTypes.func,
  getMessage: PropTypes.func,
  activeElement: PropTypes.string,
};
