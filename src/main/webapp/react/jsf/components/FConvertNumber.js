import React from 'react';
import PropTypes from 'prop-types';

export default class FConvertNumber extends React.Component {
  static propTypes = {
    pattern: PropTypes.string.isRequired,
    groupingUsed: PropTypes.bool.isRequired,
    locale: PropTypes.string.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.convert = this.convert.bind(this);
  }

  /**
   *
   * @param {number} content
   * @return {string}
   */
  convert(content) {
    const pattern = this.props.pattern.split(',');
    return content.toLocaleString(this.props.locale, {
      minimumFractionDigits: pattern[1].length,
      minimumIntegerDigits: pattern[0].length,
      useGrouping: this.props.groupingUsed,
    });
  }
}