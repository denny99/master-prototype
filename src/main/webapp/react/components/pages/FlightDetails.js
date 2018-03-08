import React from 'react';
import PropTypes from 'prop-types';
import CCFlightDetails from '../cc/CCFlightDetails';
import Flight from '../../entity/Flight';

export default class FlightDetails extends React.Component {
  static propTypes = {
    back: PropTypes.func.isRequired,
    selectedFlight: PropTypes.instanceOf(Flight).isRequired,
  };

  render() {
    return (
        <CCFlightDetails id="viewFlight" headline={true} standalone={true}
                         flight={this.props.selectedFlight}
                         back={this.props.back}/>
    );
  }
}