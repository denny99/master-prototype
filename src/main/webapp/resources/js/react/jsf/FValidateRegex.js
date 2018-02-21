import React from 'react';

export class FValidateRegex extends React.Component {
  render() {
    return ('');
  }

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