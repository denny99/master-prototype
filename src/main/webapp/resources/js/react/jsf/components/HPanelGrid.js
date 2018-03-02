import React from 'react';
import PropTypes from 'prop-types';

export default class HPanelGrid extends React.Component {
  static propTypes = {
    columns: PropTypes.number,
  };

  render() {
    let columns = [];
    for (let i = 0; i < this.props.columns; i++) {
      columns.push(
          <td key={i}>
            {this.props.children[i]}
          </td>,
      );
    }

    return (
        <table>
          <tbody>
          <tr>
            {columns}
          </tr>
          </tbody>
        </table>
    );
  }
}
