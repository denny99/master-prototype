import React from 'react';

export class FSelectItem extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      id: context.getFormId(this.props.id),
    };
  }

  render() {
    return (
        <span className={this.props.show ? this.props.styleClass : ''}
              id={this.state.id}>
          {this.props.show ? this.props.message : <span id={this.state.id}/>}
      </span>);
  }
}
