import React from 'react';
import {HForm} from '../../jsf/HForm';
import {FValidateRegex} from '../../jsf/FValidateRegex';
import {HInputText} from '../../jsf/HInputText';
import {HMessage} from '../../jsf/HMessage';
import {HCommandButton} from '../../jsf/HCommandButton';

export class FlightOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }

  /**
   * handle form submit
   * @param data
   */
  submit(data) {
    // get form data

    // do ajax call
    console.log(data);
  }

  render() {
    return (
        <HForm id="searchForm" styleClass="ice-skin-rime contentLevelContainer"
               data={this.state.data}>
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
                          action={this.submit} styleClass="iceCmdBtn btnOption"
                          id="flightSearchButton"/>
        </HForm>);
  }
}