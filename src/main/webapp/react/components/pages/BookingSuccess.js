import React from 'react';
import PropTypes from 'prop-types';

export default class BookingSuccess extends React.Component {
  static propTypes = {
    finish: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return <div/>;
  }
}