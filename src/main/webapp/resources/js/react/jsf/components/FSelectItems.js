import React from 'react';
import PropTypes from 'prop-types';
import {SelectItem} from '../objects/SelectItem';
import {FSelectItem} from './FSelectItem';

export class FSelectItems extends React.Component {
  static propTypes = {
    value: PropTypes.arrayOf(PropTypes.instanceOf(SelectItem)),
  };

  constructor(props, context) {
    super(props);
    this.state = {
      id: context.getFormId(this.props.id),
    };
  }

  render() {
    const options = this.props.value.map((item, i) => {
      return <FSelectItem key={i} value={item.value} itemLabel={item.label}/>;
    });
    return (
        <React.Fragment>
          {options}
        </React.Fragment>
    );
  }
}

FSelectItems.contextTypes = {
  updateMessages: PropTypes.func,
  getFormId: PropTypes.func,
  property: PropTypes.func,
};
