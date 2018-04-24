import React from 'react';
import {HBody, UiComposition} from 'react-jsf/src/index';

export default class BaseTemplate extends UiComposition {
  render() {
    return (<HBody>
      <div>
      {this.getSection('content')}
      </div>
    </HBody>);
  }
}