import React from 'react';
import PropTypes from 'prop-types';

export default class UIFragment extends React.Component {
  static propTypes = {
    rendered: PropTypes.bool.isRequired,
  };

  render() {
    if (this.props.rendered !== false) {
      return this.props.children;
    } else {
      return <div/>;
    }
  }
}
