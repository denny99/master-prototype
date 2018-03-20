import React from 'react';

export default class COtherwise extends React.Component {
  static propTypes = {};

  render() {
    return React.Children.map(this.props.children, (child, i) => {
      return React.cloneElement(child, {
        key: i,
      });
    });
  }
}