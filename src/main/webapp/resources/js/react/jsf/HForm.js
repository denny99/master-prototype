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
      data: this.props.data,
    };

    this.updateMessages = this.updateMessages.bind(this);
    this.getFormId = this.getFormId.bind(this);
    this.data = this.data.bind(this);
  }

  render() {
    return (
        <form id={this.props.id}
              className={this.props.styleClass}>
          {this.state.children}
        </form>);
  }

  /**
   * combined getter and setter for form data
   * @param {string} propertyName
   * @param {string} [value]
   * @return {Object}
   */
  data(propertyName, value) {
    /**
     *
     * @param {object} data
     * @param {string[]} properties
     */
    function recursion(data, properties) {
      let newData;
      if (!data.hasOwnProperty(properties[properties.length - 1])) {
        newData = {};
      }
      else {
        newData = data[properties.pop()];
      }
      if (value !== undefined && properties.length === 1) {
        newData[properties.pop()] = value;
        return null;
      } else if (properties.length === 0) {
        return newData;
      } else {
        return recursion(newData, properties);
      }
    }

    let properties = propertyName.split('.').reverse();

    let result = recursion(this.state.data, properties);
    // only update state when update occurred!
    if (result === null) {
      this.setState({
        data: this.state.data,
      });
    }
    return result;
  }

  getChildContext() {
    return {
      updateMessages: this.updateMessages,
      getFormId: this.getFormId,
      data: this.data,
    };
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
    let change = false;
    let children = React.Children.map(this.state.children, (child) => {

      // only messages are changed
      if (child.type === HMessage) {
        // is the message meant for the input field
        if (inputText.props.id === child.props.for) {
          change = child.props.show !== inputText.state.hasError;
          return React.cloneElement(child, {
            show: inputText.state.hasError,
            message: message,
          });
        }
      }

      // clone current input and focus
      if (child.props.id === inputText.props.id) {
        return React.cloneElement(child, {
          focus: true,
        });
      }

      return child;
    });
    // only re render if changed
    if (change) {
      this.setState({
        children: children,
      });
    }
  }
}

HForm.childContextTypes = {
  updateMessages: PropTypes.func,
  getFormId: PropTypes.func,
  data: PropTypes.func,
};