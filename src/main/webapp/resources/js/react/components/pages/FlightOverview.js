import React from 'react';
import {HForm} from '../../jsf/components/HForm';
import {FValidateRegex} from '../../jsf/components/FValidateRegex';
import {HInputText} from '../../jsf/components/HInputText';
import {HMessage} from '../../jsf/components/HMessage';
import {HCommandButton} from '../../jsf/components/HCommandButton';
import {HSelectOneMenu} from '../../jsf/components/HSelectOneMenu';
import {FSelectItem} from '../../jsf/components/FSelectItem';
import {FSelectItems} from '../../jsf/components/FSelectItems';
import {SelectItem} from '../../jsf/objects/SelectItem';
import {HPanelGroup} from '../../jsf/components/HPanelGroup';
import {AceDataTable} from '../../jsf/components/AceDataTable';
import {FFacet} from '../../jsf/components/FFacet';
import {AceColumn} from '../../jsf/components/AceColumn';
import {ApiResponse} from '../../entity/ApiResponse';
import {FlightService} from '../../service/FlightService';

export class FlightOverview extends React.Component {
  static PAGE_SIZE = 10;

  constructor(props) {
    super(props);
    this.state = {
      data: {},
      searched: false,
      results: new ApiResponse(0, FlightOverview.PAGE_SIZE),
      overviewVisible: true,
      detailsViewVisible: false,
      selectedFlight: null,
    };
    this.options = [];
    this.options.push(new SelectItem('asc', 'Ascending'));
    this.options.push(new SelectItem('desc', 'Descending'));

    this.submit = this.submit.bind(this);
  }

  /**
   * handle form submit
   * @param [currentPage] default 1
   */
  submit(currentPage) {
    // check for form error and re-render messages if required
    if (this.searchForm.hasError()) {
      return;
    }

    (async () => {
      // get form data
      let data = this.searchForm.state.data;

      const limit = this.state.results.limit;
      const offset = currentPage === undefined ?
          0 :
          ((currentPage - 1) * this.state.results.limit);

      let response = await FlightService.getFlights(data.arrivalFilter,
          limit, offset, data.sortOrder);

      // TODO? change output object to include max?
      this.setState({
        searched: true,
        results: new ApiResponse(offset, limit,
            response.length === limit ?
                100000 :
                (currentPage * FlightOverview.PAGE_SIZE ||
                    FlightOverview.PAGE_SIZE), response),
      });
    })();
  }

  viewFlight(flight) {
    this.setState({
      overviewVisible: false,
      detailsViewVisible: true,
      selectedFlight: flight,
    });
  }

  render() {
    return (
        <React.Fragment>
          <HForm key="0" ref={(form) => {
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
          <HForm key="1" id="datatableForm">
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
                  <span
                      className="iceOutTxt center blockArea">#[flight.dateTime]</span>
                </AceColumn>
                <AceColumn>
                  <FFacet name="header">
                    <span className="iceOutTxt">Action</span>
                  </FFacet>
                  <HCommandButton value="View"
                                  id="viewFlight"
                                  actionArgument="#[flight]"
                                  action={this.viewFlight}
                                  styleClass="iceCmdBtn btnOption"/>
                </AceColumn>
              </AceDataTable>
            </HPanelGroup>

            <div className="clear"/>
            <hr/>
          </HForm>
        </React.Fragment>
    );
  }
}