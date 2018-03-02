import React from 'react';
import PropTypes from 'prop-types';

export default class CIf extends React.Component {
  static propTypes = {
    test: PropTypes.bool,
  };

  render() {
    if (this.props.test) {
      return this.props.children;
    } else {
      return null;
    }
  }
}