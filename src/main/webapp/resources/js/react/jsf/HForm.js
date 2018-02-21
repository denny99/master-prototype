import React from 'react';

export class HForm extends React.Component {
  render() {
    return (
        <from id={this.props.id}
              className={this.props.styleClass ? this.props.styleClass : ''}>
          {this.props.children}
        </from>);
  }
}