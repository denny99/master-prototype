import React from 'react';
import FAjax from '../components/FAjax';

export default class JsfElement extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      id: (context.getFormId) ?
          context.getFormId(this.props.id) :
          this.props.id,
      children: [],
    };

    // convert children
    React.Children.forEach(this.props.children, (child) => {
      let object;
      if (child.type === FAjax) {
        child = React.cloneElement(child, {
          this: this,
        });
      }
      object = new child.type(child.props, child.context);
      this.ajax = object;
      this.state.children.push(object);
    });

    this.handleAjax = this.handleAjax.bind(this);
  }

  /**
   *
   * @return {object}
   */
  handleAjax() {
    let props = {};
    if (this.ajax) {
      switch (this.ajax.props.event) {
        case 'blur':
          props.onBlur = this.ajax.call;
          break;
        default:
          props.onClick = this.ajax.call;
          break;
      }
    }
    return props;
  }
}