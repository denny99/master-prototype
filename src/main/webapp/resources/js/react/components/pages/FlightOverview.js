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

export class FlightOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
    this.options = [];
    this.options.push(new SelectItem('asc', 'Ascending'));
    this.options.push(new SelectItem('desc', 'Descending'));
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
                          action={this.submit} styleClass="iceCmdBtn btnOption"
                          id="flightSearchButton"/>
        </HForm>);
  }
}