import React from 'react';
import FFacet from './FFacet';

export default class AceColumn extends React.Component {
  static propTypes = {};

  constructor(props, context) {
    super(props, context);
    React.Children.forEach(this.props.children, (child) => {
      if (child.type === FFacet && child.props.name === 'header') {
        this.header = child;
      } else {
        this.column = child;
      }
    });
  }
}