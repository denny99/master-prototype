import React from 'react';
import {HBody, UiComposition} from 'react-jsf';

export default class BaseTemplate extends UiComposition {
  render() {
    return (<HBody>
      <div>
      {this.getSection('content')}
      </div>
    </HBody>);
  }
}