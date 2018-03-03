import React from 'react';
import PropTypes from 'prop-types';

export default class HSelectBooleanCheckbox extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    style: PropTypes.object,
    styleClass: PropTypes.string,
  };

  static defaultProps = {
    focus: false,
    type: 'text',
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      id: (context.getFormId) ?
          context.getFormId(this.props.id) :
          this.props.id,
    };
  }

  handleChange(event) {
    this.value = event.target.value;
  }

  render() {
    return (<input id={this.state.id} name={this.state.id}
                   type="checkbox" onChange={this.handleChange}
                   defaultValue={this.value || false}/>);
  }
}

HSelectBooleanCheckbox.contextTypes = {
  updateMessages: PropTypes.func,
  getFormId: PropTypes.func,
  property: PropTypes.func,
};