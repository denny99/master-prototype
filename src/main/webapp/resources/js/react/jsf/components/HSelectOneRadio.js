import React from 'react';
import PropTypes from 'prop-types';
import SelectOne from '../superclass/SelectOne';

export default class HSelectOneRadio extends SelectOne {
  static propTypes = {
    id: PropTypes.string,
    value: PropTypes.string,
    layout: PropTypes.string,
    styleClass: PropTypes.string,
    style: PropTypes.object,
    requiredMessage: PropTypes.string,
    required: PropTypes.bool,
  };

  constructor(props, context) {
    super(props, context);

  }

  handleChange(event) {
    return (async () => {
      return await super.handleChange(event);
    })();
  }

  render() {
    return (
        <table className={this.props.styleClass}
               id={this.state.id} style={this.props.style}>
          <tbody>
          <tr>
            <td>
              <input checked="true" id="passengerData:luggageRadio:0"
                     name="passengerData:luggageRadio" type="radio"
                     value="0"/><label
                htmlFor="passengerData:luggageRadio:0"> No
              luggage</label></td>
          </tr>
          <tr>
            <td>
              <input id="passengerData:luggageRadio:1"
                     name="passengerData:luggageRadio" type="radio"
                     value="1"/><label htmlFor="passengerData:luggageRadio:1"> 1
              Bag</label></td>
          </tr>
          <tr>
            <td>
              <input id="passengerData:luggageRadio:2"
                     name="passengerData:luggageRadio" type="radio"
                     value="2"/><label htmlFor="passengerData:luggageRadio:2"> 2
              Bags</label></td>
          </tr>
          <tr>
            <td>
              <input id="passengerData:luggageRadio:3"
                     name="passengerData:luggageRadio" type="radio"
                     value="3"/>
              <label htmlFor="passengerData:luggageRadio:3"> 3
                Bags</label>
            </td>
          </tr>
          </tbody>
        </table>
    );
  }
}

HSelectOneRadio.contextTypes = {
  updateMessages: PropTypes.func,
  getFormId: PropTypes.func,
  property: PropTypes.func,
};