import React from 'react';
import PropTypes from 'prop-types';
import HSelectOneMenu from './HSelectOneMenu';
import HSelectOneRadio from './HSelectOneRadio';

export default class FSelectItem extends React.Component {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    itemLabel: PropTypes.string.isRequired,
    noSelectionOption: PropTypes.bool,
  };

  constructor(props, context) {
    super(props);

    this.isSelectable = this.isSelectable.bind(this);
  }

  /**
   *
   * @return {boolean}
   */
  isSelectable() {
    return !this.props.noSelectionOption;
  }

  render() {
    let radio = (
        <tr>
          <td>
            <input checked={this.context.currentValue === this.props.value}
                   id={this.context.getFormId(this.props.key)}
                   name={this.context.getFormId()} type="radio"
                   value={this.props.value}/>
            <label
                htmlFor={this.context.getFormId(
                    this.props.key)}>{this.props.itemLabel}</label>
          </td>
        </tr>
    );
    let option = (
        <option
            value={this.props.noSelectionOption ?
                '' :
                (this.props.value ||
                    this.props.itemLabel)}>{this.props.itemLabel}</option>
    );
    return (this.context.parent instanceof HSelectOneRadio ? radio : option);
  }
}

FSelectItem.contextTypes = {
  updateMessages: PropTypes.func,
  getFormId: PropTypes.func,
  property: PropTypes.func,
  currentValue: PropTypes.any,
  parent: PropTypes.oneOfType([
    PropTypes.instanceOf(HSelectOneMenu),
    PropTypes.instanceOf(HSelectOneRadio)]),
};
