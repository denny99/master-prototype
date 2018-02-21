import React from 'react';

// TODO suppress enter!
export class HForm extends React.Component {
  render() {
    return (
        <form id={this.props.id}
              className={this.props.styleClass}>
          {this.props.children}
        </form>);
  }
}