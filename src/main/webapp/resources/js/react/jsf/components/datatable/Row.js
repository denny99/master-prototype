import React from 'react';
import PropTypes from 'prop-types';

export class Row extends React.Component {
  static propTypes = {
    currentPage: PropTypes.number,
    pageSize: PropTypes.number,
    index: PropTypes.number,
    parentId: PropTypes.string,
    var: PropTypes.object,
    varName: PropTypes.string,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {};
    this.state[this.props.varName] = this.props.var;
  }

  render() {
    let columns = [];
    for (let i = 0, j = this.props.children.length; i < j; i++) {
      let column = this.props.children[i];
      // TODO var replacement
      columns.push(<td key={i}>{React.cloneElement(column)}</td>);
    }

    return (
        <tr className={this.props.index % 2 === 0 ?
            'ui-datatable-even' :
            'ui-datatable-odd'}
            id={`${this.props.parentId}_row_${this.props.currentPage *
            this.props.pageSize + this.props.index}`} tabIndex="0">
          {columns}
        </tr>
    );
  }
}
