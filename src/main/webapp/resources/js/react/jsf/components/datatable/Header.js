import React from 'react';
import PropTypes from 'prop-types';

export class Header extends React.Component {
  static propTypes = {
    index: PropTypes.number,
    parentId: PropTypes.string,
  };

  render() {
    return (
        <th className="ui-widget-header">
          <div className="ui-header-column clickable"
               id={`${this.props.parentId}:${this.props.index}`}>
            <span>
              <span className="ui-header-text"
                    id={`${this.props.parentId}:${this.props.index}_text`}>
                {this.props.children}
              </span>
            </span>
          </div>
        </th>
    );
  }
}
