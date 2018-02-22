import React from 'react';
import {HForm} from '../../jsf/HForm';
import {FValidateRegex} from '../../jsf/FValidateRegex';
import {FlightOverviewFormData} from '../../entity/FlightOverviewFormData';
import {HInputText} from '../../jsf/HInputText';
import {HMessage} from '../../jsf/HMessage';

export class FlightOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: new FlightOverviewFormData(),
    };

    this.setArrivalFilter = this.setArrivalFilter.bind(this);
  }

  get data() {
    return this.state.data;
  }

  /**
   * combined getter and setter for form data
   * @param {string} name
   * @returns {string}
   */
  setArrivalFilter(name) {
    if (name === undefined) {
      return this.data.arrivalFilter;
    } else {
      this.data.arrivalFilter = name;
    }
    this.setState({
      data: this.data,
    });
  }

  render() {
    return (
        <HForm id="searchForm" styleClass="ice-skin-rime contentLevelContainer">
          <div className="inputFieldGroup">
            <span
                className="iceOutTxt headerLabel">Enter Search Criterias</span>
          </div>
          <span
              className="iceOutTxt kdInputFieldLabel minindented">Filter: </span>
          <HInputText id="flightFilterInput"
                      styleClass="iceInpTxt kdInputField"
                      value={this.setArrivalFilter}
                      validatorMessage="Check your input in the field above">
            <FValidateRegex pattern="^[A-Za-zß-üÄ-Ü\.\-\s]*$"/>
          </HInputText>
          <HMessage styleClass="iceMsgError inputFieldLabel"
                    for="flightFilterInput" id="searchTermErrorMessage"/>
        </HForm>);
  }
}