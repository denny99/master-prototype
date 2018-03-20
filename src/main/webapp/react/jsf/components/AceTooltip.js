import React from 'react';
import PropTypes from 'prop-types';
import JsfElement from '../superclass/JsfElement';

export default class AceTooltip extends JsfElement {
  static propTypes = {
    id: PropTypes.string,
    for: PropTypes.string.isRequired,
    speechBubble: PropTypes.bool,
    showEffect: PropTypes.string,
    hideEffect: PropTypes.string,
    showDelay: PropTypes.number,
    hideDelay: PropTypes.number,
    position: PropTypes.string,
    targetPosition: PropTypes.string,
    showEffectLength: PropTypes.number,
    hideEffectLength: PropTypes.number,
    styleClass: PropTypes.string,
  };

  static defaultProps = {
    speechBubble: false,
    showEffect: 'slide',
    hideEffect: 'slide',
    showDelay: 200,
    hideDelay: 100,
    position: 'bottomLeft',
    targetPosition: 'topRight',
    showEffectLength: 200,
    hideEffectLength: 200,
  };

  constructor(props, context) {
    super(props, context);

    switch (this.props.showEffect) {
      case 'slide':
      default:
        this.showEffect = 'scale';
        this.showEffectOptions = {
          origin: ['top', 'left'],
        };
        break;
    }

    switch (this.props.hideEffect) {
      case 'slide':
      default:
        this.hideEffect = 'scale';
        this.hideEffectOptions = {
          origin: ['top', 'left'],
        };
        break;
    }
  }

  componentDidMount() {
    const self = this;
    this.tooltip = new ice.ace.Tooltip(this.state.id, {
      speechBubble: this.props.speechBubble,
      content: $(`#${this.state.id}`.replace(':', '\\:')).next(),
      show: {
        effect: function(offset) {
          this.toggle(self.showEffect, self.showEffectOptions,
              self.props.showEffectLength); // "this" refers to the tooltip
        },
        delay: this.props.showDelay,
      },
      position: {
        my: this.props.position,
        at: this.props.targetPosition,
      },
      hide: {
        effect: function(offset) {
          this.toggle(self.hideEffect, self.hideEffectOptions,
              self.props.hideEffectLength); // "this" refers to the tooltip
        },
        delay: this.props.hideDelay,
      },
      styleClass: this.props.styleClass,
      forComponent: this.context.getFormId(this.props.for),
      style: {
        classes: 'ui-tooltip-content',
      },
    });
  }

  render() {
    return (
        <React.Fragment>
          <span key={1} id={this.state.id}/>
          <div key={2} id={`${this.state.id}_content`}
               style={{display: 'none'}}>
            {this.props.children}
          </div>
        </React.Fragment>
    );
  }
}

AceTooltip.contextTypes = {
  getFormId: PropTypes.func,
};
