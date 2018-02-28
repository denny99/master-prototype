import React from 'react';
import PropTypes from 'prop-types';

export class FFacet extends React.Component {
  static propTypes = {
    name: PropTypes.string,
  };

  render() {
    return this.props.children;
  }
}
