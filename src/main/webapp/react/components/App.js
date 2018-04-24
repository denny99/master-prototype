import React from 'react';
import {HCommandButton, HForm, UiDefine} from 'react-jsf/src/index';
import FlightOverview from './pages/FlightOverview';
import VersionAnnotation from './includes/VersionAnnotation';
import BaseTemplate from './template/BaseTemplate';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showStartPage: true,
      showFlightOverview: false,
    };

    this.showFlightOverview = this.showFlightOverview.bind(this);
    this.hideFlightOverview = this.hideFlightOverview.bind(this);

    window.addEventListener('unhandledrejection', function(err, promise) {
      alert(err);
    });
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

  componentDidCatch(error, info) {
    alert(error + ' ' + info);
  }

  render() {
    const initialForm = (
        <BaseTemplate>
          <UiDefine name='content'>
            <h2>Welcome</h2>
            <hr/>
            <HForm id="indexForm" data={{}}>
              <HCommandButton id="viewFlightsButton"
                              action={this.showFlightOverview}
                              value="View Flights"
                              styleClass="iceCmdBtn btnOption"/>
            </HForm>
            <div className="clear"/>
            <VersionAnnotation/>
          </UiDefine>
        </BaseTemplate>);
    if (this.state.showStartPage) {
      return initialForm;
    }
    if (this.state.showFlightOverview) {
      return (
          <FlightOverview back={this.hideFlightOverview}/>
      );
    }
  }
}