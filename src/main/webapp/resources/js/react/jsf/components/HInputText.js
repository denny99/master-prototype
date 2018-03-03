import React from 'react';
import PropTypes from 'prop-types';
import Input from '../superclass/Input';

export default class HInputText extends Input {
  static propTypes = {
    focus: PropTypes.bool,
    id: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    style: PropTypes.object,
    styleClass: PropTypes.string,
    type: PropTypes.string,
    validator: PropTypes.func,
    validatorMessage: PropTypes.string,
    required: PropTypes.bool,
    requiredMessage: PropTypes.string,
    converter: PropTypes.func,
    converterMessage: PropTypes.string,
    onchange: PropTypes.func,
  };

  static defaultProps = {
    focus: false,
    type: 'text',
  };

  constructor(props, context) {
    super(props, context);

    if (this.props.converter) {
      this.converter = new this.props.converter();
    }
  }

  handleChange(event) {
    return (async () => {
      await super.handleChange(event);

      // optionally convert string to object
      if (this.props.hasOwnProperty('converter')) {
        try {
          this.value = this.converter.getAsObject(this.value);
        } catch (e) {
          this.state.hasError = hasError;
          // this is async, so we manually update the state
          this.setState({
            hasError: hasError,
          });
          this.context.updateMessages(this, this.props.converterMessage);
        }
      }
      this.props.onchange();
    })();
  }

  /**
   * auto-focus after build
   */
  componentDidMount() {
    if (this.props.focus) {
      this.input.focus();
      // set cursor to the end of input
      this.input.setSelectionRange(this.input.value.length,
          this.input.value.length);
    }
  }

  render() {
    let elem = (
        <input id={this.state.id}
               name={this.state.id}
               type={this.props.type || 'text'}
               ref={(input) => {
                 this.input = input;
               }}
               style={this.props.style}
               className={this.props.styleClass}
               value={this.value}
               onChange={this.handleChange}>
        </input>);

    let props = {};
    if (this.ajax) {
      switch (this.ajax.props.event) {
        case 'blur':
          props.onBlur = this.ajax.call;
      }
    }

    return React.cloneElement(elem, props);
  }
}

HInputText.contextTypes = {
  updateMessages: PropTypes.func,
  getFormId: PropTypes.func,
  property: PropTypes.func,
};