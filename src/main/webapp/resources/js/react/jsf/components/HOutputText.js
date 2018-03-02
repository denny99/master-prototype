import React from 'react';
import PropTypes from 'prop-types';

export default class HOutputText extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    styleClass: PropTypes.string,
    style: PropTypes.object,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    // should implement converter!
    converter: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      id: (context.getFormId) ?
          context.getFormId(this.props.id) :
          this.props.id,
    };
    if (this.props.converter) {
      this.converter = new this.props.converter();
    }
  }

  render() {
    return (<span className={this.props.styleClass} style={this.props.style}
                  id={this.state.id}>
      {this.converter ?
          this.converter.getAsString(this.props.value) :
          this.props.value}
    </span>);
  }
}

HOutputText.contextTypes = {
  getFormId: PropTypes.func,
};