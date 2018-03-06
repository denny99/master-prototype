import React from 'react';
import PropTypes from 'prop-types';
import HForm from '../../jsf/components/HForm';
import Flight from '../../entity/Flight';
import HPanelGroup from '../../jsf/components/HPanelGroup';
import HInputText from '../../jsf/components/HInputText';
import FFacet from '../../jsf/components/FFacet';
import HMessage from '../../jsf/components/HMessage';
import HCommandButton from '../../jsf/components/HCommandButton';
import CWhen from '../../jsf/components/CWhen';
import FAjax from '../../jsf/components/FAjax';
import COtherwise from '../../jsf/components/COtherwise';
import CIf from '../../jsf/components/CIf';

export default class PassengerForm extends React.Component {
  static propTypes = {
    selectedFlight: PropTypes.instanceOf(Flight).isRequired,
    cancel: PropTypes.func.isRequired,
    back: PropTypes.func.isRequired,
    bookingFormData: PropTypes.object.isRequired,
  };
  updateSlider = function() {
    let currentValue = this.bookingForm.state.data.passengerCount;
    let maxValue = this.props.selectedFlight.aircraft.passengerCount;
    let minValue = 1;
    if (minValue <= currentValue && currentValue <= maxValue) {
      if (this.sliderChange) {
        this.sliderChange = false;
      } else {
        // to avoid a loop only change when changed through direct input
        this.slider.slider('value', currentValue);
      }
      // Validierungsmeldung ausknipsen (falls vorhanden)
      this.passengerCountOutput.setState({
        hasError: false,
      });
    }
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      passengerFormVisible: true,
      bookingDetailsVisible: false,
      data: {
        passengerCount: 1,
      },
    };

    this.validatePassengerCount = this.validatePassengerCount.bind(this);
    this.showBookingDetails = this.showBookingDetails.bind(this);
    this.hideBookingDetails = this.hideBookingDetails.bind(this);
  }

  showBookingDetails() {
    this.state = {
      passengerFormVisible: false,
      bookingDetailsVisible: true,
    };
  }

  hideBookingDetails() {
    this.state = {
      passengerFormVisible: true,
      bookingDetailsVisible: false,
    };
  }

  async validatePassengerCount() {
    // TODO call backend
  }

  render() {
    if (this.state.passengerFormVisible) {
      return (
          <HForm ref={(form) => {
            this.bookingForm = form;
          }} id="passengerData" styleClass="ice-skin-rime">
            <div className="inputFieldGroup">
              <span className="iceOutTxt headerLabel">Enter Data for Passenger ##{passengerFormBean.currentPassengerIndex +
              1}</span>
            </div>
            // TODO
            <f:event id="multiFieldValidationEvent"
                     listener="#{passengerFormBean.validateForm}"
                     type="postValidate"/>
            <HPanelGroup id="passportContainer" layout="block"
                         styleClass="contentLevelContainer blockArea">
              <div className="lFloat indented inputFieldGroup">
                <CHhoose>
                  <CWhen
                      test="#{bookingFormBean.selectedFlight.foreignTravel()}">
                    <span className="iceOutTxt masInfoFieldLabel minindented">Passport Number:</span>
                    // TODO maxlength
                    <HInputText id="passportNumberInput" maxlength="6"
                                value="#{passengerFormBean.currentPassenger.passportNumber}"
                                required="true"
                                requiredMessage="Insert your Passport Number">
                      <FAjax event="blur"
                             listener="#{passengerFormBean.passportIdListener}"
                             execute="@this"
                             render="@form"/>
                    </HInputText>
                  </CWhen>
                  <COtherwise>
                    <span className="iceOutTxt masInfoFieldLabel minindented">Id Card Number:</span>
                    <HInputText id="idCardNumberInput" maxlength="5"
                                value="#{passengerFormBean.currentPassenger.idCardNumber}"
                                required="true"
                                requiredMessage="Insert your Id Card Number">
                      <FAjax event="blur"
                             listener="#{passengerFormBean.passportIdListener}"
                             execute="@this"
                             render="@form"/>
                    </HInputText>
                  </COtherwise>
                </CHhoose>
                // TODO
                <HGraphicImage id="helpIcon" library="images"
                               name="icon_info.gif">
                  // TODO click event
                  <FAjax render="@all" event="click"
                         listener="#{passengerFormBean.setPassportHelp}"/>
                </HGraphicImage>
              </div>

              <div className="clear"/>
            </HPanelGroup>
            <HPanelGroup id="personalDataContainer" layout="block"
                         styleClass="contentLevelContainer blockArea">
              <CIf test="#{passengerFormBean.existingUser}">
                <div className="indented inputFieldGroup">
                  <HCommandButton id="forceEditButton" value="Edit Data"
                                  styleClass="iceCmdBtn btnOption">
                    // TODO include in command button logic
                    <FAjax render="@form" execute="@this"
                           listener="#{passengerFormBean.forceEditListener}"/>
                  </HCommandButton>
                </div>
              </CIf>
              <div className="lFloat indented inputFieldGroup">
                <span
                    className="iceOutTxt masInfoFieldLabel minindented">Firstname:</span>
                // TODO disabled
                <HInputText id="firstNameInput"
                            disabled="#{passengerFormBean.existingUser and !passengerFormBean.forceEdit}"
                            value="#{passengerFormBean.currentPassenger.firstName}"
                            required="true"
                            requiredMessage="Insert your Firstname"/>
              </div>
              <div className="lFloat indented inputFieldGroup">
                <span
                    className="iceOutTxt masInfoFieldLabel minindented">Lastname:</span>
                <HInputText id="lastNameInput"
                            disabled="#{passengerFormBean.existingUser and !passengerFormBean.forceEdit}"
                            value="#{passengerFormBean.currentPassenger.lastName}"
                            required="true"
                            requiredMessage="Insert your Lastname"/>
              </div>
              <div className="lFloat indented inputFieldGroup">
                <span
                    className="iceOutTxt masInfoFieldLabel minindented">Birthdate:</span>
                <HInputText id="birthDateInput"
                            disabled="#{passengerFormBean.existingUser and !passengerFormBean.forceEdit}"
                            value="#{passengerFormBean.currentPassenger.birthDay}"
                            required="true"
                            requiredMessage="Insert your Birthdate"
                            converter="de.uni.frankfurt.ShortDateConverter"/>
              </div>
              <div className="clear"/>
            </HPanelGroup>
            <HPanelGroup id="luggageContainer" layout="block"
                         styleClass="contentLevelContainer blockArea">
              <span className="iceOutTxt masInfoFieldLabel minindented">Select the desired amount of luggage</span>
              // TODO
              <h:selectOneRadio id="luggageRadio"
                                styleClass="iceSelOneRb masInfoInputField"
                                required="true"
                                layout="pageDirection"
                                requiredMessage="Select the amount of luggage you want to check in"
                                value="#{passengerFormBean.currentPassenger.luggageCount}">
                <FSelectItems id="luggageNumbers"
                              value="#{passengerFormBean.luggageItems}"/>
              </h:selectOneRadio>
              <div className="clear"/>
              <HMessage styleClass="iceMsgError inputFieldLabel"
                        for="firstNameInput" id="firstNameErrorMessage"/>
              <HMessage styleClass="iceMsgError inputFieldLabel"
                        for="lastNameInput" id="lastNameErrorMessage"/>
              <HMessage styleClass="iceMsgError inputFieldLabel"
                        for="birthDateInput" id="birthDateErrorMessage"/>
              <HMessage styleClass="iceMsgError inputFieldLabel"
                        for="idCardNumberInput" id="idCardErrorMessage"/>
              <HMessage styleClass="iceMsgError inputFieldLabel"
                        for="passportNumberInput" id="passportErrorMessage"/>
            </HPanelGroup>

            <HCommandButton value="Cancel"
                            action="#{bookingBean.cancelBooking}"
                            id="cancelBookingButton"
                            styleClass="iceCmdBtn btnOption"/>
            // TODO immediate?
            <HCommandButton immediate="true" action="#{passengerFormBean.back}"
                            value="Back"
                            id="backButton"
                            styleClass="iceCmdBtn btnOption"/>
            <HCommandButton value="Continue"
                            id="continueButton"
                            action="#{passengerFormBean.next}"
                            styleClass="iceCmdBtn btnOption"/>

            // TODO
            <ice:panelPopup id="passportHelpPopup"
                            visible="#{passengerFormBean.passportHelp}"
                            draggable="false"
                            styleClass="popup frameHolder" autoCentre="true">
              <FFacet name="body">
                <div id="iFrameWrapper">
                  <ICEOutputText styleClass="iceOutTxt">
                    Your passport number should start with P and constist of 5
                    numbers <br/>
                    Your id card number should consist of 5 numbers
                  </ICEOutputText>
                </div>
              </FFacet>
            </ice:panelPopup>
          </HForm>
      );
    } else {
      return <div></div>;
    }
  }
}