import React from 'react';
import PropTypes from 'prop-types';
import HSelectOneMenu from './HSelectOneMenu';

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
    let radioId = this.context.getFormId(Math.floor(Math.random() * 1000000));
    let radio = (
        <tr>
          <td>
            <input checked={this.context.currentValue === this.props.value}
                   id={radioId}
                   name={radioId} type="radio"
                   value={this.props.value}
                   onChange={this.context.parent.handleChange}/>
            <label
                htmlFor={radioId}>{this.props.itemLabel}</label>
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
    return (this.context.parent instanceof HSelectOneMenu ? option : radio);
  }
}

FSelectItem.contextTypes = {
  updateMessages: PropTypes.func,
  getFormId: PropTypes.func,
  property: PropTypes.func,
  currentValue: PropTypes.any,
  parent: PropTypes.any,
};
