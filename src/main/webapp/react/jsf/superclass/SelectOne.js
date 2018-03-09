import React from 'react';
import Input from './Input';
import FSelectItem from '../components/FSelectItem';
import FSelectItems from '../components/FSelectItems';

export default class SelectOne extends Input {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    // if value is unset the first children is the one selected per default
    if (this.value === null || this.value === '') {
      let selectedChild = React.Children.toArray(this.props.children)[0];
      if (selectedChild.type === FSelectItem) {
        if (selectedChild.props.noSelectionOption) {
          this.state.hasError = true;
        }
        this.value = selectedChild.props.value;
      }
      if (selectedChild.type === FSelectItems) {
        if (selectedChild.props.value[0].noSelectionOption) {
          this.state.hasError = true;
        }
        this.value = selectedChild.props.value[0].value;
      }

      this.context.updateMessages(this, this.props.requiredMessage, true);
    }
  }

  getChildContext() {
    return {
      updateMessages: this.context.updateMessages,
      getFormId: (key) => {
        return key ? `${this.state.id}:${key}` : this.state.id;
      },
      property: this.context.property,
      currentValue: this.value,
      parent: this,
    };
  }
}