import React from 'react';
import {UiComposition} from 'react-jsf';

export default class BaseTemplate extends UiComposition {
  render() {
    return (<div>
      {this.getSection('content')}
    </div>);
  }
}