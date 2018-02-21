import React from 'react';
import {HForm} from '../jsf/HForm';
import {HCommandButton} from '../jsf/HCommandButton';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showStartPage: true,
      showFlightOverview: false,
    };

    this.showFlightOverview = this.showFlightOverview.bind(this);
  }

  showFlightOverview() {
    this.setState({
      showStartPage: false,
      showFlightOverview: true,
    });
  }

  render() {
    const initialForm = (
        <HForm id="indexForm">
          <HCommandButton id="viewFlightsButton"
                          action={this.showFlightOverview}
                          value="View Flights"
                          styleClass="iceCmdBtn btnOption"/>
        </HForm>);
    if (this.state.showStartPage) {
      return initialForm;
    }
    if (this.state.showFlightOverview) {
      return <h3>Tada</h3>;
    }
  }
}