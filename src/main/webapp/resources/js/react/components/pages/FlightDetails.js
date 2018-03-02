import React from 'react';
import PropTypes from 'prop-types';
import CCFlightDetails from '../cc/CCFlightDetails';
import Flight from '../../entity/Flight';

export default class FlightDetails extends React.Component {
  static propTypes = {
    back: PropTypes.func,
    selectedFlight: PropTypes.instanceOf(Flight),
  };

  render() {
    return (
        <CCFlightDetails id="viewFlight" headline={true} standalone={true}
                         flight={this.props.selectedFlight}
                         back={this.props.back}/>
    );
  }
}