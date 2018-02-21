import React from 'react';

export class HCommandButton extends React.Component {
  render() {
    return (
        <input className={this.props.styleClass} id={this.props.id}
               name={this.props.id} type="submit" value={this.props.value}
               onClick={this.props.action}/>
    );
  }
}