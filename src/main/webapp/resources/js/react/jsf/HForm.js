import React from 'react';
import PropTypes from 'prop-types';
import {HInputText} from './HInputText';
import {HMessage} from './HMessage';

// TODO suppress enter!
export class HForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      children: this.props.children,
    };

    this.updateMessages = this.updateMessages.bind(this);
    this.getFormId = this.getFormId.bind(this);
  }

  render() {
    return (
        <form id={this.props.id}
              className={this.props.styleClass}>
          {this.state.children}
        </form>);
  }

  getChildContext() {
    return {updateMessages: this.updateMessages, getFormId: this.getFormId};
  }

  /**
   * build form id
   * @param {string} id
   * @returns {string}
   */
  getFormId(id) {
    return `${this.props.id}:${id}`;
  }

  /**
   *
   * @param {HInputText} inputText
   * @param {string} message
   */
  updateMessages(inputText, message) {
    if (inputText.state.hasError) {
      this.setState({
        children: React.Children.map(this.state.children, (child) => {
          if (child.type === HMessage) {
            if (inputText.props.id === child.props.for) {
              return React.cloneElement(child, {
                show: true,
                message: message,
              });
            }
          }
          return child;
        }),
      });
    }
  }
}

HForm.childContextTypes = {
  updateMessages: PropTypes.func,
  getFormId: PropTypes.func,
};