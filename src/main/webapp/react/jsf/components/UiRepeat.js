import React from 'react';
import PropTypes from 'prop-types';
import VarInjector from '../../util/VarInjector';

export default class Row extends React.Component {
  static propTypes = {
    value: PropTypes.arrayOf(PropTypes.object).isRequired,
    var: PropTypes.string.isRequired,
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    let rows = [];
    let children = React.Children.toArray(this.props.children);

    for (let i = 0; i < this.props.value.length; i++) {
      let obj = this.props.value[i];
      let subChildren = [];
      for (let child of children) {
        subChildren.push(
            VarInjector.inject(child, this.props.var, obj),
        );
      }

      rows.push(
          <div key={i}>
            {subChildren}
          </div>,
      );
    }

    return (
        <React.Fragment>
          {rows}
        </React.Fragment>
    );
  }
}
