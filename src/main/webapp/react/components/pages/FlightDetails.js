import React from 'react';
import PropTypes from 'prop-types';
import CCFlightDetails from '../cc/CCFlightDetails';
import Flight from '../../entity/Flight';
import BaseTemplate from '../template/BaseTemplate';
import {UiDefine} from 'react-jsf';

export default class FlightDetails extends React.Component {
  static propTypes = {
    back: PropTypes.func.isRequired,
    selectedFlight: PropTypes.instanceOf(Flight).isRequired,
  };

  render() {
    return (
        <BaseTemplate>
          <UiDefine name='content'>
            <CCFlightDetails id="viewFlight" headline={true} standalone={true}
                             flight={this.props.selectedFlight}
                             back={this.props.back}/>
          </UiDefine>
        </BaseTemplate>
    );
  }
}