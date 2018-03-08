import React from 'react';
import PropTypes from 'prop-types';
import JsfElement from '../superclass/JsfElement';

export default class IcePanelPopup extends JsfElement {
  static propTypes = {
    id: PropTypes.string,
    styleClass: PropTypes.string,
    visible: PropTypes.bool,
    draggable: PropTypes.bool,
    autoCentre: PropTypes.bool,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      width: undefined,
      height: undefined,
    };
  }

  componentDidUpdate() {
    // only do once
    if (this.state.height === undefined || this.state.height === 0) {
      this.setState({
        width: this.popup.offsetWidth,
        height: this.popup.offsetHeight,
      });
    }
  }

  render() {
    // currently auto centre is always active!
    let style = {
      display: 'block',
      position: 'absolute',
      left: this.state.width ?
          window.innerWidth / 2 - (this.state.width / 2) :
          '0',
      top: this.state.height ?
          window.innerHeight / 2 - (this.state.height / 2) :
          '0',
    };

    if (!this.props.visible) {
      style.display = 'none';
    }

    return (
        <div ref={(div) => this.popup = div}
             className={`icePnlPop ${this.props.styleClass}`}
             id={this.state.id}
             style={style}>
          <table cellPadding="0" cellSpacing="0">
            <tbody>
            <tr id={`${this.state.id}-tr`}>
              <td className="icePnlPopBody popupBody frameHolderBody"
                  colSpan="2">
                {this.body}
              </td>
            </tr>
            </tbody>
          </table>
          <span id={`${this.state.id}script`}/>
        </div>
    );
  }
}
IcePanelPopup.contextTypes = {
  getFormId: PropTypes.func,
};
