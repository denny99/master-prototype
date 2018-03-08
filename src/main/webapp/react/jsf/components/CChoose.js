import React from 'react';
import COtherwise from './COtherwise';
import CWhen from './CWhen';

export default class CChoose extends React.Component {
  static propTypes = {};

  render() {
    let cwhen = null;
    let otherwise = null;
    for (let child of React.Children.toArray(this.props.children)) {
      if (child.type === CWhen && child.props.test) {
        cwhen = child;
        break;
      } else if (child.type === COtherwise) {
        otherwise = child;
      }
    }

    return cwhen !== null ? cwhen : otherwise;
  }
}