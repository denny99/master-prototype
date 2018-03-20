import React from 'react';
import PropTypes from 'prop-types';
import JsfElement from '../superclass/JsfElement';
import * as _ from 'lodash';

export default class AceDialog extends JsfElement {
  static propTypes = {
    id: PropTypes.string,
    styleClass: PropTypes.string,
    header: PropTypes.string,
    visible: PropTypes.bool,
    closable: PropTypes.bool,
    modal: PropTypes.bool,
    draggable: PropTypes.bool,
    resizable: PropTypes.bool,
    showEffect: PropTypes.string,
    hideEffect: PropTypes.string,
    showHeader: PropTypes.bool,
  };

  static invisibleStyle = {display: 'none', zIndex: 1000, outline: 0};
  static visibleStyle = {
    display: 'block',
    zIndex: 1002,
    outline: 0,
    height: 'auto',
    minWidth: '150px',
    width: 'auto',
  };

  constructor(props, context) {
    super(props, context);

    this.state.visible = this.props.visible;
    this.state.height = undefined;
    this.state.width = undefined;

    this.hide = this.hide.bind(this);
  }

  componentDidUpdate() {
    // only do once
    if (this.state.height === undefined && this.state.visible) {
      this.setState({
        width: this.dialog.offsetWidth,
        height: this.dialog.offsetHeight,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({visible: nextProps.visible});
  }

  hide() {
    this.setState({
      visible: false,
    });
  }

  render() {
    let style = {
      left: this.state.width ?
          window.innerWidth / 2 - (this.state.width / 2) : 0,
      top: this.state.height ?
          window.innerHeight / 2 - (this.state.height / 2) : 0,
    };
    style = _.merge(style, this.state.visible ?
        AceDialog.visibleStyle :
        AceDialog.invisibleStyle);
    return (
        <div id={this.state.id}>
          {this.state.visible ?
              <div className="ui-widget-overlay" style={{
                width: window.innerWidth,
                height: window.innerHeight,
                zIndex: 1001,
              }}/> :
              null}
          <div ref={(div) => {
            this.dialog = div;
          }}
               className={`ui-dialog ui-widget ui-widget-content ui-corner-all ${this.props.styleClass}`}
               tabIndex="-1" role="dialog"
               aria-labelledby={`ui-dialog-title-${this.state.id}_main`}
               aria-hidden={this.state.visible}
               style={style}>
            <div
                className="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix">
              <span className="ui-dialog-title"
                    id={`ui-dialog-title-${this.state.id}_main`}>{this.props.header}</span>
              <a className="ui-dialog-titlebar-close ui-corner-all"
                 role="button"
                 onClick={this.hide}
                 href="#"
                 style={this.props.closable ? {} : {display: 'none'}}>
                <span className="ui-icon ui-icon-closethick">close</span>
              </a>
            </div>
            <div id={`${this.state.id}_main`}
                 className="ui-dialog-content ui-widget-content"
                 style={this.state.visible ?
                     {
                       width: 'auto',
                       minHeight: 0,
                       height: 'auto',
                     } :
                     {}}
            >
              {this.props.children}
            </div>
          </div>
        </div>
    );
  }
};
