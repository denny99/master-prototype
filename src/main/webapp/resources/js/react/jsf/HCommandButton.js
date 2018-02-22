import React from 'react';
import PropTypes from 'prop-types';

export class HCommandButton extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      id: context.getFormId(this.props.id),
    };
  }

  render() {
    return (
        <input className={this.props.styleClass} id={this.state.id}
               name={this.props.id} type="submit" value={this.props.value}
               onClick={this.props.action}/>
    );
  }
}

HCommandButton.contextTypes = {
  updateForm: PropTypes.func,
  getFormId: PropTypes.func,
};