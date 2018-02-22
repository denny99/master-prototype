import React from 'react';
import PropTypes from 'prop-types';

export class HCommandButton extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      id: context.getFormId(this.props.id),
    };

    this.action = this.action.bind(this);
  }

  /**
   * on click action
   * gather data from parent form
   * @param {Event} e
   */
  action(e) {
    // jsf used form, but we don't wanna submit them in react
    e.preventDefault();
    this.props.action(this.context.data);
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
  updateForm: PropTypes.func,
  getFormId: PropTypes.func,
  data: PropTypes.object,
};