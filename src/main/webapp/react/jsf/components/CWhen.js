import React from 'react';
import PropTypes from 'prop-types';

export default class CWhen extends React.Component {
  static propTypes = {
    test: PropTypes.bool.isRequired,
  };

  render() {
    return React.Children.map(this.props.children, (child, i) => {
      return React.cloneElement(child, {
        key: i,
      });
    });
  }
}