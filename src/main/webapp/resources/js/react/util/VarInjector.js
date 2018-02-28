import React from 'react';

export class VarInjector {
  /**
   *
   * @param {React.Component} component
   * @param {string} varName name of variable
   * @param {object} variable contains the data to be injected
   */
  static inject(component, varName, variable) {
    for (let key of component.props) {
      if (key === 'children') {
        continue;
      }
      if (VarInjector.hasInjection()) {
        component.props[key] = VarInjector.replace(component.props[key],
            varName, props);
      }
    }

    for (let child of (component.props.children || [])) {
      VarInjector.replace(child, varName, variable);
    }
  }

  static hasInjection() {

  }

  static replace(string, varName, props) {

  }
}