import React from 'react';
import PropTypes from 'prop-types';
import FFacet from './FFacet';

export default class IcePanelTooltip extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    hideOn: PropTypes.string,
  };
  static hiddenStyle = {display: 'none', visibility: 'hidden'};

  constructor(props, context) {
    super(props, context);
    this.state = {
      id: (context.getFormId) ?
          context.getFormId(this.props.id) :
          this.props.id,
      style: IcePanelTooltip.hiddenStyle,
    };

    React.Children.forEach(this.props.children, (child) => {
      if (child.type === FFacet) {
        this[child.props.name] = child.props.children;
      }
    });

    this.hideTooltip = this.hideTooltip.bind(this);
  }

  hideTooltip() {
    this.setState({
      style: IcePanelTooltip.hiddenStyle,
    });
  }

  render() {
    let props = {};

    switch (this.props.hideOn) {
      case 'mouseout':
        props.onMouseOut = this.hideTooltip;
        break;
    }

    let div = (<div className="icePnlTlTip" id={this.state.id}
                    style={this.state.style}>
      <table cellPadding="0" cellSpacing="0">
        <tbody>
        <tr id={`${this.state.id}-tr`}>
          <td className="icePnlTlTipBody" colSpan="2">
            {this.body}
          </td>
        </tr>
        </tbody>
      </table>
      <span id={`${this.state.id}script`}/></div>);
    return React.cloneElement(div, props);
  }
}

IcePanelTooltip.contextTypes = {
  getFormId: PropTypes.func,
};
