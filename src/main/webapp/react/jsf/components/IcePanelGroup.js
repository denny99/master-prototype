import React from 'react';
import PropTypes from 'prop-types';
import JsfElement from '../superclass/JsfElement';

export default class IcePanelGroup extends JsfElement {
  static propTypes = {
    id: PropTypes.string,
    panelTooltip: PropTypes.string,
    styleClass: PropTypes.string,
    style: PropTypes.object,
    rendered: PropTypes.bool,
  };

  constructor(props, context) {
    super(props, context);

    this.onMouseOver = this.onMouseOver.bind(this);
  }

  /**
   *
   * @param {SyntheticEvent} event
   */
  onMouseOver(event) {
    if (this.props.panelTooltip) {
      new ToolTipPanelPopup(this.div, this.context.getFormId(
          this.props.panelTooltip), event.nativeEvent, 'mouseout', '500',
          'false',
          this.context.getFormId(), '', '/xmlhttp/blank', 'hover', false);
    }
  }

  render() {
    if (this.props.rendered !== false) {
      return (
          <div ref={(div) => {
            this.div = div;
          }} className={`icePnlGrp ${this.props.styleClass}`}
               id={this.props.id}
               onMouseOver={this.onMouseOver}
               style={this.props.style}>{this.props.children}</div>);
    } else {
      return <div/>;
    }
  }
}

IcePanelGroup.contextTypes = {
  getFormId: PropTypes.func,
};
