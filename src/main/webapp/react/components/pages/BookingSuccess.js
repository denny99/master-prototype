import React from 'react';
import PropTypes from 'prop-types';
import {HCommandButton, HForm, UiDefine} from 'react-jsf/src/index';
import BaseTemplate from '../template/BaseTemplate';

export default class BookingSuccess extends React.Component {
  static propTypes = {
    finish: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
        <BaseTemplate>
          <UiDefine name='content'>
            <h2 key={0} id="bookingCompleteMessage">Booking Successful!</h2>
            <HForm key={1} id="successInfo">
              <HCommandButton id="completeButton" action={this.props.finish}
                              value="Back to Flights"
                              styleClass="iceCmdBtn btnOption"/>
            </HForm>
          </UiDefine>
        </BaseTemplate>
    );
  }
}