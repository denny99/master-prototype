import React from 'react';
import PropTypes from 'prop-types';

export default class FValidateRegex extends React.Component {
  static propTypes = {
    pattern: PropTypes.string.isRequired,
  };

  /**
   *
   * @param {string} content
   * @return {boolean}
   */
  validate(content) {
    const pattern = this.props.pattern;
    return content.match(pattern) !== null;
  }
}