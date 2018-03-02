import React from 'react';
import PropTypes from 'prop-types';

export default class FFacet extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
  };

  render() {
    return this.props.children;
  }
}
