import React from 'react';
import {ObjectTraverser} from './ObjectTraverser';

export class VarInjector {
  static injectRegex = /#\[.*]/g;

  /**
   *
   * @param {React.Component} component
   * @param {string} varName name of variable
   * @param {object} variable contains the data to be injected
   *
   * @return {React.Component}
   */
  static inject(component, varName, variable) {
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
        props[key] = VarInjector.replace(value,
            varName, variable);
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
        children.push(VarInjector.inject(child, varName, variable));
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
    return value.match(VarInjector.injectRegex) !== null;
  }

  /**
   *
   * @param {string} string
   * @param {string} varName
   * @param {object} object
   * @return {string}
   */
  static replace(string, varName, object) {
    const regex = new RegExp(`#\\[${varName}\\..*]`, 'g');
    for (let group of string.match(regex)) {
      //group has the pattern #[varName..*], extract only .*
      let property = group.slice(2 + varName.length + 1, group.length - 1);
      let value = ObjectTraverser.traverse(object, property);
      string = string.replace(group, value);
    }
    return string;
  }
}