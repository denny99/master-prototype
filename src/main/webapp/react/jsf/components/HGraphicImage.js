import React from 'react';
import PropTypes from 'prop-types';
import JsfElement from '../superclass/JsfElement';

export default class HGraphicImage extends JsfElement {
  static propTypes = {
    id: PropTypes.string,
    library: PropTypes.string,
    name: PropTypes.string,
    onclick: PropTypes.func,
  };

  render() {
    return (
        <img id={this.state.id}
             src={`/javax.faces.resource/${this.props.name}.jsf?ln=${this.props.library}&amp;v=3_3_0_130416`}
             onClick={this.props.onclick || (() => {
             })}/>
    );
  }
}

HGraphicImage.contextTypes = {
  getFormId: PropTypes.func,
};
