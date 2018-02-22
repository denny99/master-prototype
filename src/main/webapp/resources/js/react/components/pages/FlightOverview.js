import React from 'react';
import {HForm} from '../../jsf/HForm';
import {FValidateRegex} from '../../jsf/FValidateRegex';
import {FlightOverviewFormData} from '../../entity/FlightOverviewFormData';
import {HInputText} from '../../jsf/HInputText';
import {HMessage} from '../../jsf/HMessage';

export class FlightOverview extends React.Component {
  constructor(props) {
    super(props);
    this.data = {
      flightOverviewFormData: new FlightOverviewFormData(),
    };
  }



  render() {
    return (
        <HForm id="searchForm" styleClass="ice-skin-rime contentLevelContainer"
               data={this.data}>
          <div className="inputFieldGroup">
            <span
                className="iceOutTxt headerLabel">Enter Search Criterias</span>
          </div>
          <span
              className="iceOutTxt kdInputFieldLabel minindented">Filter: </span>
          <HInputText id="flightFilterInput"
                      styleClass="iceInpTxt kdInputField"
                      value="flightOverviewFormData.arrivalFilter"
                      validatorMessage="Check your input in the field above">
            <FValidateRegex pattern="^[A-Za-zß-üÄ-Ü\.\-\s]*$"/>
          </HInputText>
          <HMessage styleClass="iceMsgError inputFieldLabel"
                    for="flightFilterInput" id="searchTermErrorMessage"/>
        </HForm>);
  }
}