import React from 'react';
import {FValidateRegex} from './FValidateRegex';

export class HForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return (
        <input id={this.props.id}
               className={this.props.styleClass} value={this.props.value}>
          {this.props.children}
        </input>);
  }

  /**
   * checks correctness of input
   * @return {boolean}
   */
  validate() {
    for (let child of this.props.children) {
      if (child instanceof FValidateRegex) {
        // do regexp validation
        if (!child.validate(this.props.value)) {
          this.setState({
            hasError: true,
          });
          return false;
        }
      }
    }

    return true;
  }
}