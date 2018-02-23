import React from 'react';
import PropTypes from 'prop-types';
import {HInputText} from './HInputText';
import {HMessage} from './HMessage';

// TODO suppress enter!
export class HForm extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    styleClass: PropTypes.string,
  };

  constructor(props) {
    super(props);

    let messageProps = {};

    // add state props for every message we can show
    React.Children.forEach(this.props.children, (child) => {
      if (child.type === HMessage) {
        messageProps[child.props.for] = {
          message: '',
          show: false,
        };
      }
    });
    this.state = {
      messageProps: messageProps,
      data: this.props.data,
    };

    this.updateMessages = this.updateMessages.bind(this);
    this.getFormId = this.getFormId.bind(this);
    this.property = this.property.bind(this);
  }

  render() {
    // overwrite onSubmit to prevent submitting at all
    const children = React.Children.map(this.props.children, (child) => {
      if (child.type === HMessage) {
        return React.cloneElement(child, {
          messageProps: this.state.messageProps,
        });
      } else {
        return child;
      }
    });

    return (
        <form id={this.props.id}
              className={this.props.styleClass}>
          {children}
        </form>);
  }

  /**
   * combined getter and setter for form data
   * @param {string} propertyName
   * @param {string} [value]
   * @return {Object}
   */
  property(propertyName, value) {
    /**
     * move down in object
     * @param {object} data
     * @param {string[]} properties
     */
    function recursion(data, properties) {
      // last property and wanna set data?
      if (value !== undefined && properties.length === 1) {
        data[properties.pop()] = value;
        return null;
      }

      // try to move down in the object
      let property = properties.pop();

      // final property reached?
      if (properties.length === 0) {
        return data[property] || '';
      }

      // if property is missing create empty object
      if (!data.hasOwnProperty(property)) {
        data[property] = {};
      }

      // move further down
      return recursion(data[property], properties);

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
      property: this.property,
      data: this.state.data,
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
   * @param {HInputText | HSelectOneMenu} input
   * @param {string} message
   * @param {boolean} [skipRender]
   */
  updateMessages(input, message, skipRender) {
    this.state.messageProps[input.props.id] = {
      message: message,
      show: input.state.hasError,
    };
    if (!skipRender) {
      this.setState({
        messageProps: this.state.messageProps,
      });
    }
  }
}

HForm.childContextTypes = {
  updateMessages: PropTypes.func,
  getFormId: PropTypes.func,
  data: PropTypes.object,
  property: PropTypes.func,
};