import React from 'react';
import PropTypes from 'prop-types';
import HInputText from './HInputText';
import ObjectTraverser from '../../util/ObjectTraverser';

export default class HForm extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    styleClass: PropTypes.string,
    data: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      messageProps: {},
      data: this.props.data,
    };

    this.updateMessages = this.updateMessages.bind(this);
    this.getFormId = this.getFormId.bind(this);
    this.property = this.property.bind(this);
    this.initMessage = this.initMessage.bind(this);
    this.getMessage = this.getMessage.bind(this);
  }

  render() {
    return (
        <form id={this.props.id} name={this.props.id}
              className={this.props.styleClass}>
          {this.props.children}
        </form>);
  }

  /**
   * @param {string} forId
   */
  initMessage(forId) {
    this.state.messageProps[forId] = {
      message: '',
      show: false,
    };
  }

  /**
   * @param {string} forId
   * @return {{message: string, show: boolean}}
   */
  getMessage(forId) {
    return this.state.messageProps[forId];
  }

  /**
   * combined getter and setter for form data
   * @param {string} propertyName
   * @param {string} [value]
   * @return {Object}
   */
  property(propertyName, value) {
    let result = ObjectTraverser.traverse(this.state.data, propertyName, value);
    // only update state when update occurred!
    if (result === null && value !== undefined) {
      this.setState({
        data: this.state.data,
      });
    }
    return result ? result : '';
  }

  getChildContext() {
    return {
      updateMessages: this.updateMessages,
      getFormId: this.getFormId,
      property: this.property,
      all: this.context.all,
      form: this,
      initMessage: this.initMessage,
      getMessage: this.getMessage,
    };
  }

  /**
   * build form id
   * @param {string} [id]
   * @return {string}
   */
  getFormId(id) {
    if (id) {
      return `${this.props.id}:${id}`;
    } else {
      return this.props.id;
    }
  }

  /**
   * checks for any error inside of the form
   * @return {boolean}
   */
  hasError() {
    for (let key in this.state.messageProps) {
      if (this.state.messageProps.hasOwnProperty(key)) {
        if (this.state.messageProps[key].show) {
          this.setState({
            messageProps: this.state.messageProps,
          });
          return true;
        }
      }
    }
    return false;
  }

  /**
   *
   * @param {HInputText | HSelectOneMenu | HSelectOneRadio} input
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
  initMessage: PropTypes.func,
  getMessage: PropTypes.func,
  updateMessages: PropTypes.func,
  getFormId: PropTypes.func,
  property: PropTypes.func,
  all: PropTypes.object,
  form: PropTypes.instanceOf(HForm),
};