import React from 'react';
import PropTypes from 'prop-types';
import {
  AceColumn, AceDataTable, FFacet, FSelectItem, FSelectItems,
  FValidateRegex, HCommandButton, HForm, HInputText, HMessage, HOutputText,
  HPanelGrid, HPanelGroup, HSelectOneMenu, SelectItem, UiDefine,
} from 'react-jsf';
import FlightService from '../../service/FlightService';
import FlightDetails from './FlightDetails';
import DateConverter from '../../converter/DateConverter';
import BookingForm from './BookingForm';
import FlightSearchResponse from '../../entity/FlightSearchResponse';
import BaseTemplate from '../template/BaseTemplate';

export default class FlightOverview extends React.Component {
  static propTypes = {
    back: PropTypes.func.isRequired,
  };
  static PAGE_SIZE = 10;

  constructor(props) {
    super(props);
    this.state = {
      data: {},
      searched: false,
      results: new FlightSearchResponse({}),
      overviewVisible: true,
      detailsViewVisible: false,
      bookingFormVisible: false,
      selectedFlight: null,
    };
    this.options = [];
    this.options.push(new SelectItem('asc', 'Ascending'));
    this.options.push(new SelectItem('desc', 'Descending'));

    this.submit = this.submit.bind(this);
    this.showBookingForm = this.showBookingForm.bind(this);
    this.hideBookingForm = this.hideBookingForm.bind(this);
    this.showFlightDetails = this.showFlightDetails.bind(this);
    this.hideFlightDetails = this.hideFlightDetails.bind(this);
  }

  /**
   * handle form submit
   * @param [currentPage] default 1
   */
  submit(currentPage) {
    (async () => {
      // get form data
      let data = this.searchForm.state.data;

      const limit = FlightOverview.PAGE_SIZE;
      const offset = currentPage === undefined ?
          0 :
          ((currentPage - 1) * FlightOverview.PAGE_SIZE);

      let response = await FlightService.getFlights(data.arrivalFilter,
          limit, offset, data.sortOrder);

      this.setState({
        searched: true,
        results: response,
      });
    })();
  }

  /**
   *
   * @param {Flight} flight
   */
  showFlightDetails(flight) {
    this.setState({
      overviewVisible: false,
      detailsViewVisible: true,
      selectedFlight: flight,
    });
  }

  /**
   *
   */
  hideFlightDetails() {
    this.setState({
      overviewVisible: true,
      detailsViewVisible: false,
    });
  }

  /**
   *
   * @param {Flight} flight
   */
  showBookingForm(flight) {
    this.setState({
      overviewVisible: false,
      bookingFormVisible: true,
      selectedFlight: flight,
    });
  }

  /**
   *
   */
  hideBookingForm() {
    this.setState({
      overviewVisible: true,
      bookingFormVisible: false,
    });
  }

  render() {
    let code;
    if (this.state.overviewVisible) {
      code = (
          <BaseTemplate>
            <UiDefine name='content'>
              <HForm ref={(form) => {
                this.searchForm = form;
              }} id="searchForm"
                     styleClass="ice-skin-rime contentLevelContainer"
                     data={this.state.data}>
                <div className="inputFieldGroup">
            <span
                className="iceOutTxt headerLabel">Enter Search Criterias</span>
                </div>
                <span
                    className="iceOutTxt kdInputFieldLabel minindented">Filter: </span>
                <HInputText id="flightFilterInput"
                            styleClass="iceInpTxt kdInputField"
                            value="arrivalFilter"
                            validatorMessage="Check your input in the field above">
                  <FValidateRegex pattern="^[A-Za-zß-üÄ-Ü\.\-\s]*$"/>
                </HInputText>
                <HSelectOneMenu id="sortOrderSelect" styleClass="iceSelOneMnu"
                                value="sortOrder"
                                required={true}
                                requiredMessage="Enter a Date Sort Order"
                                style={{
                                  bottom: '3px',
                                  position: 'relative',
                                  width: '179px',
                                }}>
                  <FSelectItem itemLabel="Select One"
                               noSelectionOption={true}/>
                  <FSelectItems value={this.options}/>
                </HSelectOneMenu>
                <div className="clear"/>
                <HMessage styleClass="iceMsgError inputFieldLabel"
                          for="flightFilterInput" id="searchTermErrorMessage"/>
                <HMessage styleClass="iceMsgError inputFieldLabel"
                          for="sortOrderSelect" id="sortOrderErrorMessage"/>
                <span className="iceOutTxt iceOutLbl"
                      style={{fontSize: '10px', color: 'black'}}>You can search for Arrival locations</span>
                <div className="clear"/>
                <HCommandButton value="Search"
                                style={{
                                  marginTop: '10px',
                                }}
                                action={this.submit}
                                styleClass="iceCmdBtn btnOption"
                                id="flightSearchButton"/>
              </HForm>
              <HForm id="datatableForm">
                <HPanelGroup layout="block" styleClass="blockArea"
                             style={{width: '1192px'}}
                             rendered={this.state.searched}
                             id="searchWrapper">
                  <h2>Flight Overview</h2>
                  <AceDataTable id="flightsTable"
                                value={this.state.results}
                                onLoad={this.submit}
                                var="flight" rows={FlightOverview.PAGE_SIZE}
                                paginator={true}>
                    <AceColumn>
                      <FFacet name="header">
                        <span className="iceOutTxt">Departure</span>
                      </FFacet>
                      <span
                          className="iceOutTxt center blockArea">#[flight.departure.city]</span>
                    </AceColumn>
                    <AceColumn>
                      <FFacet name="header">
                        <span className="iceOutTxt">Arrival</span>
                      </FFacet>
                      <span
                          className="iceOutTxt center blockArea">#[flight.arrival.city]</span>
                    </AceColumn>
                    <AceColumn>
                      <FFacet name="header">
                        <span className="iceOutTxt">Date</span>
                      </FFacet>
                      <HOutputText converter={DateConverter}
                                   value="#[flight.dateTime]"
                                   styleClass="iceOutTxt center blockArea"/>
                    </AceColumn>
                    <AceColumn>
                      <FFacet name="header">
                        <span className="iceOutTxt">Action</span>
                      </FFacet>
                      <HPanelGrid columns={2}>
                        <HCommandButton key={0} value="View"
                                        id="viewFlight"
                                        actionArgument="#[flight]"
                                        action={this.showFlightDetails}
                                        styleClass="iceCmdBtn btnOption"/>
                        <HCommandButton key={1} value="Book"
                                        id="bookFlight"
                                        actionArgument="#[flight]"
                                        action={this.showBookingForm}
                                        styleClass="iceCmdBtn btnOption"/>
                      </HPanelGrid>
                    </AceColumn>
                  </AceDataTable>
                </HPanelGroup>

                <div className="clear"/>
                <hr/>
                <HCommandButton action={this.props.back}
                                value="Back To Home Page"
                                styleClass="iceCmdBtn btnOption"/>
              </HForm>
            </UiDefine>
          </BaseTemplate>
      );
    } else if (this.state.detailsViewVisible) {
      code = <FlightDetails selectedFlight={this.state.selectedFlight}
                            back={this.hideFlightDetails}/>;
    } else if (this.state.bookingFormVisible) {
      code = <BookingForm selectedFlight={this.state.selectedFlight}
                          cancel={this.hideBookingForm}/>;
    }

    return code;
  }
}