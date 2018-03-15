import React from 'react';
import PropTypes from 'prop-types';
import Input from '../superclass/Input';
import * as _ from 'lodash';

export default class HSelectBooleanCheckbox extends Input {
  static propTypes = {
    id: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    style: PropTypes.object,
    styleClass: PropTypes.string,
    // receives this as first param
    validator: PropTypes.func,
  };

  async componentDidMount() {
    if (_.isEmpty(this.value)) {
      this.value = false;
    }

    await this.componentDidUpdate();
    this.initialValidation = false;
  }

  async handleChange(event) {
    return await super.handleChange({
      target: {
        value: event.target.checked,
      },
    });
  }

  render() {
    return (<input className={this.props.styleClass} id={this.state.id}
                   name={this.state.id}
                   type="checkbox" onChange={this.handleChange}
                   defaultValue={this.value || false}/>);
  }
}

HSelectBooleanCheckbox.contextTypes = {
  updateMessages: PropTypes.func,
  getFormId: PropTypes.func,
  property: PropTypes.func,
};