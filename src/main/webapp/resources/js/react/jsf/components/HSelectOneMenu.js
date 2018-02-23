import React from 'react';
import PropTypes from 'prop-types';
import {Input} from '../superclass/Input';
import {FSelectItem} from './FSelectItem';
import {FSelectItems} from './FSelectItems';

export class HSelectOneMenu extends Input {
  static propTypes = {
    id: PropTypes.string,
    size: PropTypes.number,
    styleClass: PropTypes.string,
    style: PropTypes.object,
    requiredMessage: PropTypes.string,
    required: PropTypes.bool,
  };

  constructor(props, context) {
    super(props, context);
    // set for value setter...
    this.context = context;
    // the first children is the one selected per default
    let selectedChild = React.Children.toArray(props.children)[0];
    if (selectedChild.type === FSelectItem &&
        selectedChild.props.noSelectionOption) {
      this.state.hasError = true;
      this.value = selectedChild.props.value;
    }
    if (selectedChild.type === FSelectItems) {
      if (selectedChild.props.value[0].noSelectionOption) {
        this.state.hasError = true;
        this.value = selectedChild.props.value[0].value;
      }
    }
    context.updateMessages(this, '', true);
  }

  render() {
    return (
        <select className={this.props.styleClass} id={this.state.id}
                name={this.state.id} size={this.props.size}
                style={this.props.style}
                onChange={this.handleChange}
        >
          {this.props.children}
        </select>);
  }
}

HSelectOneMenu.contextTypes = {
  updateMessages: PropTypes.func,
  getFormId: PropTypes.func,
  data: PropTypes.object,
  property: PropTypes.func,
};