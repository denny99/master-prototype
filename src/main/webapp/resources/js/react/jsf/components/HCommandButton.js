import React from 'react';
import PropTypes from 'prop-types';
import JsfElement from '../superclass/JsfElement';

export default class HCommandButton extends JsfElement {
  static propTypes = {
    id: PropTypes.string,
    value: PropTypes.string.isRequired,
    immediate: PropTypes.bool,
    style: PropTypes.object,
    styleClass: PropTypes.string,
    action: PropTypes.func,
    actionArgument: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  };

  constructor(props, context) {
    super(props);
    this.state = {
      id: (context.getFormId) ?
          context.getFormId(this.props.id) :
          this.props.id,
    };

    this.action = this.action.bind(this);
  }

  /**
   * on click action
   * gather data from parent form
   * @param {Event} e
   */
  async action(e) {
    // jsf used form, but we don't wanna submit them in react
    e.preventDefault();
    if (!this.props.immediate) {
      if (this.ajax && this.ajax.props.event === 'click') {
        await this.ajax.call();
      }
    }
    // argument might be undefined
    this.props.action(this.props.actionArgument);

  }

  render() {
    return (
        <input className={this.props.styleClass} id={this.state.id}
               style={this.props.style}
               name={this.props.id} type="submit" value={this.props.value}
               onClick={this.action}/>
    );
  }
}

HCommandButton.contextTypes = {
  getFormId: PropTypes.func,
};