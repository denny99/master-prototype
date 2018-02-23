import React from 'react';
import PropTypes from 'prop-types';

export class FSelectItem extends React.Component {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    itemLabel: PropTypes.string.isRequired,
    noSelectionOption: PropTypes.bool,
  };

  constructor(props, context) {
    super(props);
    this.state = {
      id: context.getFormId(this.props.id),
    };

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
    return (
        <option
            value={this.props.noSelectionOption ?
                '' :
                (this.props.value ||
                    this.props.itemLabel)}>{this.props.itemLabel}</option>
    );
  }
}

FSelectItem.contextTypes = {
  updateMessages: PropTypes.func,
  getFormId: PropTypes.func,
  data: PropTypes.object,
  property: PropTypes.func,
};
