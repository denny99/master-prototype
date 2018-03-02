import React from 'react';
import PropTypes from 'prop-types';

export default class IcePanelGroup extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    panelTooltip: PropTypes.string,
    styleClass: PropTypes.string,
    style: PropTypes.object,
    rendered: PropTypes.bool,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      id: (context.getFormId) ?
          context.getFormId(this.props.id) :
          this.props.id,
    };

    this.onMouseOver = this.onMouseOver.bind(this);
  }

  /**
   *
   * @param {SyntheticEvent} event
   */
  onMouseOver(event) {
    new ToolTipPanelPopup(this.div, this.context.getFormId(
        this.props.panelTooltip), event.nativeEvent, 'mouseout', '500', 'false',
        this.context.getFormId(), '', '/xmlhttp/blank', 'hover', false);
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
