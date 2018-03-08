import React from 'react';
import PropTypes from 'prop-types';

export default class UIFragment extends React.Component {
  static propTypes = {
    rendered: PropTypes.bool,
  };

  render() {
    if (this.props.rendered) {
      return this.props.children;
    } else {
      return <div/>;
    }
  }
}
