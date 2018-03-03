import React from 'react';
import PropTypes from 'prop-types';

export default class FAjax extends React.Component {
  static propTypes = {
    event: PropTypes.string.isRequired,
    execute: PropTypes.string,
    render: PropTypes.string,
    listener: PropTypes.func.isRequired,
    this: PropTypes.object,
  };

  static defaultProps = {
    execute: '@this',
    render: '@this',
  };

  constructor(props, context) {
    super(props, context);

    this.call = this.call.bind(this);
  }

  /**
   *
   * @return {Promise<void>}
   */
  async call() {
    let obj;
    switch (this.props.execute) {
      case '@form':
        obj = this.context.form;
        break;
      case '@all':
        obj = this.context.all;
        break;
      default:
        obj = this.props.this;
        break;
    }
    await this.props.listener(obj, this.props.render);
  }
}

FAjax.contextTypes = {
  all: PropTypes.object,
  form: PropTypes.object,
};