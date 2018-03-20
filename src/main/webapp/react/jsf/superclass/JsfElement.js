import React from 'react';
import FAjax from '../components/FAjax';
import FFacet from '../components/FFacet';
import FValidateRegex from '../components/FValidateRegex';
import FConvertNumber from '../components/FConvertNumber';

export default class JsfElement extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      id: (context.getFormId) ?
          context.getFormId(this.props.id) :
          this.props.id,
      children: [],
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
    this.converterError = this.converterError.bind(this);
  }

  /**
   * @return {object| number | string}
   */
  get value() {
    let value = this.props.value;

    // only convert if requested input not empty
    value = this.converter && typeof value !== 'string' ?
        this.converter.getAsString(value) :
        value;

    return value;
  }


  /**
   * checks if the current input can be converted
   * @returns {boolean}
   */
  converterError() {
    if (!this.converter) {
      return false;
    }
    try {
      typeof this.value !== 'object' ?
          this.converter.getAsObject(this.value) :
          this.value;
      return false;
    } catch (e) {
      return true;
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