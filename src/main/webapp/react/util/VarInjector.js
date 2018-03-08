import React from 'react';
import ObjectTraverser from './ObjectTraverser';

export default class VarInjector {
  static injectionRegex = /#\[.*]/g;

  /**
   *
   * @param {React.Component} component
   * @param {string} varName name of object
   * @param {object} object contains the data to be injected
   *
   * @return {React.Component}
   */
  static inject(component, varName, object) {
    let props = {};
    let children = [];

    for (let key in component.props) {
      if (!component.props.hasOwnProperty(key)) {
        continue;
      }

      // skip complex subchildren structure, only continue with plain string
      if (key === 'children' && (typeof component.props[key]) === 'object') {
        continue;
      }
      let value = component.props[key];
      if (VarInjector.hasInjection(value)) {
        if (this.hasObjectInjection(value, varName)) {
          props[key] = object;
        } else {
          props[key] = VarInjector.replace(value,
              varName, object);
        }
      } else {
        // we are replacing all props, so save the original value
        props[key] = value;
      }
    }

    // check if we have to search for injections in the children
    if (component.hasOwnProperty('props') &&
        component.props.hasOwnProperty('children') &&
        typeof component.props.children === 'object') {
      for (let child of (component.props.children)) {
        children.push(VarInjector.inject(child, varName, object));
      }
    } else {
      // child is plain string
      children = props.children;
    }

    return React.cloneElement(component, props, children);
  }

  /**
   *
   * @param {string} value
   */
  static hasInjection(value) {
    return typeof value === 'string' &&
        value.match(VarInjector.injectionRegex) !== null;
  }

  /**
   *
   * @param {string} value
   * @param {string} varName
   */
  static hasObjectInjection(value, varName) {
    return value.match(new RegExp(`#\\[${varName}]`, 'g')) !== null;
  }

  /**
   *
   * @param {string} string
   * @param {string} varName
   * @param {object} object
   * @return {string | object}
   */
  static replace(string, varName, object) {
    const regex = new RegExp(`#\\[${varName}\\..*]`, 'g');
    for (let group of string.match(regex)) {
      //group has the pattern #[varName..*], extract only .*
      let property = group.slice(2 + varName.length + 1, group.length - 1);
      let value = ObjectTraverser.traverse(object, property);
      if (typeof value === 'string') {
        string = string.replace(group, value);
      } else {
        string = value;
      }
    }
    return string;
  }
}