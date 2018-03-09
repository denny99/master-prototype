import React from 'react';
import FAjax from '../components/FAjax';
import FFacet from '../components/FFacet';
import FValidateRegex from '../components/FValidateRegex';
import FConvertNumber from '../components/FConvertNumber';
import Input from './Input';

export default class JsfElement extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      id: (context.getFormId) ?
          context.getFormId(this.props.id) :
          this.props.id,
      children: [],
      hasError: false,
    };

    // convert children
    React.Children.forEach(this.props.children, (child) => {
      let object;
      if (child.type === FAjax) {
        child = React.cloneElement(child, {
          this: this,
        });
        object = new child.type(child.props, context);
        this.ajax = object;
        return;
      }
      if (child.type === FFacet) {
        this[child.props.name] = child.props.children;
        return;
      }
      if (child.type === FValidateRegex) {
        object = new child.type(child.props, context);
        this.state.children.push(object);
        return;
      }
      if (child.type === FConvertNumber) {
        this.converter = new child.type(child.props, context);
      }
    });

    if (this.props.converter) {
      this.converter = new this.props.converter();
    }

    this.handleAjax = this.handleAjax.bind(this);
  }

  /**
   * @return {object| number | string}
   */
  get value() {
    // only inputs write back to form element via prop notation
    let value = (typeof this.props.value === 'string' && this instanceof
        Input) ?
        this.context.property(this.props.value) :
        this.props.value;

    // only convert if requested input not empty
    value = this.converter && typeof value === 'object' ?
        this.converter.getAsString(value) :
        value;

    return value;
  }

  /**
   *
   * @param {object| number | string} o
   */
  set value(o) {
    let value = o;
    try {
      value = this.converter && typeof o !== 'object' ?
          this.converter.getAsObject(o) :
          o;
      this.setState({
        hasError: false,
      });
      this.state.hasError = false;
      this.context.updateMessages(this, this.props.converterMessage);
    } catch (e) {
      this.setState({
        hasError: true,
      });
      this.state.hasError = true;
      this.context.updateMessages(this, this.props.converterMessage);
    } finally {
      this.context.property(this.props.value, value);
    }
  }

  /**
   *
   * @return {object}
   */
  handleAjax() {
    let props = {};
    if (this.ajax) {
      switch (this.ajax.props.event) {
        case 'blur':
          props.onBlur = this.ajax.call;
          break;
        default:
          props.onClick = this.ajax.call;
          break;
      }
    }
    return props;
  }
}