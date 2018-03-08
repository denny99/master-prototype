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

  render() {
    let style = {
      display: 'block',
      position: 'absolute',
      left: '735px', // how to calculate?
      top: '294px',
    };

    if (!this.props.visible) {
      style.display = 'none';
    }

    return (
        <div className={`icePnlPop ${this.props.styleClass}`}
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
