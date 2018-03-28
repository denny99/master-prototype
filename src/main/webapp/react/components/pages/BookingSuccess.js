import React from 'react';
import PropTypes from 'prop-types';
import {HCommandButton, HForm} from 'react-jsf';

export default class BookingSuccess extends React.Component {
  static propTypes = {
    finish: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
        <React.Fragment>
          <h2 key={0} id="bookingCompleteMessage">Booking Successful!</h2>
          <HForm key={1} id="successInfo">
            <HCommandButton id="completeButton" action={this.props.finish}
                            value="Back to Flights"
                            styleClass="iceCmdBtn btnOption"/>
          </HForm>
        </React.Fragment>
    );
  }
}