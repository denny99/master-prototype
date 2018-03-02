import React from 'react';
import PropTypes from 'prop-types';
import HInputText from './HInputText';
import HMessage from './HMessage';
import ObjectTraverser from '../../util/ObjectTraverser';

export default class HForm extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    styleClass: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.messageProps = {};

    // add state props for every message we can show
    React.Children.forEach(this.props.children, (child) => {
      if (child.type === HMessage) {
        this.messageProps[child.props.for] = {
          message: '',
          show: false,
        };
      }
    });
    this.state = {
      messageProps: JSON.parse(JSON.stringify(this.messageProps)),
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
        <form id={this.props.id} name={this.props.id}
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
    let result = ObjectTraverser.traverse(this.state.data, propertyName, value);
    // only update state when update occurred!
    if (result === null && value !== undefined) {
      this.setState({
        data: this.state.data,
      });
    }
    return result || '';
  }

  getChildContext() {
    return {
      updateMessages: this.updateMessages,
      getFormId: this.getFormId,
      property: this.property,
    };
  }

  /**
   * build form id
   * @param {string} id
   * @return {string}
   */
  getFormId(id) {
    return `${this.props.id}:${id}`;
  }

  /**
   * checks for any error inside of the form
   * @return {boolean}
   */
  hasError() {
    for (let key in this.messageProps) {
      if (this.messageProps.hasOwnProperty(key)) {
        if (this.messageProps[key].show) {
          this.setState({
            messageProps: this.messageProps,
          });
          return true;
        }
      }
    }
    return false;
  }

  /**
   *
   * @param {HInputText | HSelectOneMenu} input
   * @param {string} message
   * @param {boolean} [skipRender]
   */
  updateMessages(input, message, skipRender) {
    this.messageProps[input.props.id] = {
      message: message,
      show: input.state.hasError,
    };
    if (!skipRender) {
      this.setState({
        messageProps: JSON.parse(JSON.stringify(this.messageProps)),
      });
    }
  }
}

HForm.childContextTypes = {
  updateMessages: PropTypes.func,
  getFormId: PropTypes.func,
  property: PropTypes.func,
};