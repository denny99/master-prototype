import React from 'react';
import PropTypes from 'prop-types';
import HForm from '../jsf/components/HForm';
import HCommandButton from '../jsf/components/HCommandButton';
import FlightOverview from './pages/FlightOverview';
import VersionAnnotation from './includes/VersionAnnotation';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showStartPage: true,
      showFlightOverview: false,
    };

    this.showFlightOverview = this.showFlightOverview.bind(this);
    this.hideFlightOverview = this.hideFlightOverview.bind(this);
  }

  showFlightOverview() {
    this.setState({
      showStartPage: false,
      showFlightOverview: true,
    });
  }

  hideFlightOverview() {
    this.setState({
      showStartPage: true,
      showFlightOverview: false,
    });
  }

  render() {
    const initialForm = (
        <React.Fragment>
          <h2>Welcome</h2>
          <hr/>
          <HForm id="indexForm">
            <HCommandButton id="viewFlightsButton"
                            action={this.showFlightOverview}
                            value="View Flights"
                            styleClass="iceCmdBtn btnOption"/>
          </HForm>
          <div className="clear"/>
          <VersionAnnotation/>
        </React.Fragment>);
    if (this.state.showStartPage) {
      return initialForm;
    }
    if (this.state.showFlightOverview) {
      return (
          <FlightOverview back={this.hideFlightOverview}/>
      );
    }
  }

  getChildContext() {
    return {
      all: this,
    };
  }
}

App.childContextTypes = {
  all: PropTypes.instanceOf(App),
};