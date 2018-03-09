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
import HGraphicImage from '../../jsf/components/HGraphicImage';
import FSelectItems from '../../jsf/components/FSelectItems';
import ShortDateConverter from '../../converter/ShortDateConverter';
import HSelectOneRadio from '../../jsf/components/HSelectOneRadio';
import Passenger from '../../entity/Passenger';
import IceOutputText from '../../jsf/components/IceOutputText';
import IcePanelPopup from '../../jsf/components/IcePanelPopup';
import CChoose from '../../jsf/components/CChoose';
import SelectItem from '../../jsf/elements/SelectItem';
import IntegerConverter from '../../converter/IntegerConverter';

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
      data: this.props.bookingFormData,
      forceEdit: false,
      existingUser: false,
      passportHelp: false,
    };

    this.currentPassengerIndex = 0;
    this.passengers = [];

    // setup radio items
    this.luggageItems = [];
    this.luggageItems.push(new SelectItem(0, 'No luggage'));
    this.luggageItems.push(new SelectItem(1, '1 Bag'));
    this.luggageItems.push(new SelectItem(2, '2 Bags'));
    this.luggageItems.push(new SelectItem(3, '3 Bags'));

    // create empty passengers
    for (let i = 0; i < this.props.bookingFormData.passengerCount; i++) {
      this.passengers.push(new Passenger());
    }
    // setup first passenger
    this.state.data.currentPassenger = this.passengers[0];

    this.validateForm = this.validateForm.bind(this);
    this.togglePassportHelp = this.togglePassportHelp.bind(this);
    this.passportIdListener = this.passportIdListener.bind(this);
    this.next = this.next.bind(this);
    this.back = this.back.bind(this);
    this.toggleForceEdit = this.toggleForceEdit.bind(this);
  }

  get currentPassenger() {
    return this.passengerForm.state.data.currentPassenger;
  }

  /**
   *
   * @param {Passenger} passenger
   */
  set currentPassenger(passenger) {
    this.passengerForm.state.data.currentPassenger = passenger;
  }

  hidePassengerForm() {
    this.setState({
      passengerFormVisible: true,
      bookingDetailsVisible: false,
    });
  }

  next() {
    this.validateForm();

    if (this.currentPassengerIndex + 1 === this.passengers.length) {
      return this.setState({
        passengerFormVisible: false,
        bookingDetailsVisible: true,
      });
    }

    // save current data
    this.state.data = this.passengerForm.state.data;
    // save entered passenger data
    this.passengers[this.currentPassengerIndex] = this.currentPassenger;

    // increase index
    this.currentPassengerIndex++;
    this.state.data.currentPassenger = this.passengers[this.currentPassengerIndex];

    // inform form about change
    this.passengerForm.setState({
      data: this.state.data,
    });
  }

  back() {
    if (this.currentPassengerIndex === 0) {
      return this.props.back();
    }
    // save current data
    this.state.data = this.passengerForm.state.data;
    // save entered passenger data
    this.passengers[this.currentPassengerIndex] = this.currentPassenger;

    // decrease index
    this.currentPassengerIndex--;
    // set last passenger as current
    this.state.data.currentPassenger = this.passengers[this.currentPassengerIndex];

    // inform form about change
    this.passengerForm.setState({
      data: this.state.data,
    });
  }

  toggleForceEdit() {
    this.setState({
      forceEdit: !this.state.forceEdit,
    });
  }

  validateForm() {

  }

  togglePassportHelp() {
    this.setState({
      passportHelp: !this.state.passportHelp,
    });
  }

  /**
   *
   * @param {React.Component} input
   * @param {string} render
   */
  passportIdListener(input, render) {

  }

  render() {
    if (this.state.passengerFormVisible) {
      return (
          <HForm ref={(form) => {
            this.passengerForm = form;
          }} id="passengerData" styleClass="ice-skin-rime"
                 data={this.state.data}>
            <div className="inputFieldGroup">
              <span
                  className="iceOutTxt headerLabel">Enter Data for Passenger #{this.currentPassengerIndex +
              1}</span>
            </div>
            <HPanelGroup id="passportContainer" layout="block"
                         styleClass="contentLevelContainer blockArea">
              <div className="lFloat indented inputFieldGroup">
                <CChoose>
                  <CWhen
                      test={this.props.selectedFlight.foreignTravel()}>
                    <span className="iceOutTxt masInfoFieldLabel minindented">Passport Number:</span>
                    <HInputText id="passportNumberInput" maxlength={6}
                                value="currentPassenger.passportNumber"
                                required={true}
                                requiredMessage="Insert your Passport Number">
                      <FAjax event="blur"
                             listener={this.passportIdListener}
                             execute="@this"
                             render="@form"/>
                    </HInputText>
                  </CWhen>
                  <COtherwise>
                    <span className="iceOutTxt masInfoFieldLabel minindented">Id Card Number:</span>
                    <HInputText id="idCardNumberInput" maxlength={5}
                                value="currentPassenger.idCardNumber"
                                required={true}
                                requiredMessage="Insert your Id Card Number">
                      <FAjax event="blur"
                             listener={this.passportIdListener}
                             execute="@this"
                             render="@form"/>
                    </HInputText>
                  </COtherwise>
                </CChoose>
                <HGraphicImage id="helpIcon" library="images"
                               name="icon_info.gif"
                               onclick={this.togglePassportHelp}/>
              </div>

              <div className="clear"/>
              <HMessage styleClass="iceMsgError inputFieldLabel"
                        for="idCardNumberInput" id="idCardErrorMessage"/>
              <HMessage styleClass="iceMsgError inputFieldLabel"
                        for="passportNumberInput" id="passportErrorMessage"/>
            </HPanelGroup>
            <HPanelGroup id="personalDataContainer" layout="block"
                         styleClass="contentLevelContainer blockArea">
              <CIf test={this.state.existingUser}>
                <div className="indented inputFieldGroup">
                  <HCommandButton id="forceEditButton" value="Edit Data"
                                  styleClass="iceCmdBtn btnOption"
                                  action={this.toggleForceEdit}>
                  </HCommandButton>
                </div>
              </CIf>
              <div className="lFloat indented inputFieldGroup">
                <span
                    className="iceOutTxt masInfoFieldLabel minindented">Firstname:</span>
                <HInputText id="firstNameInput"
                            disabled={this.state.existingUser &&
                            !this.state.forceEdit}
                            value="currentPassenger.firstName"
                            required={true}
                            requiredMessage="Insert your Firstname"/>
              </div>
              <div className="lFloat indented inputFieldGroup">
                <span
                    className="iceOutTxt masInfoFieldLabel minindented">Lastname:</span>
                <HInputText id="lastNameInput"
                            disabled={this.state.existingUser &&
                            !this.state.forceEdit}
                            value="currentPassenger.lastName"
                            required={true}
                            requiredMessage="Insert your Lastname"/>
              </div>
              <div className="lFloat indented inputFieldGroup">
                <span
                    className="iceOutTxt masInfoFieldLabel minindented">Birthdate:</span>
                <HInputText id="birthDateInput"
                            disabled={this.state.existingUser &&
                            !this.state.forceEdit}
                            value="currentPassenger.birthDay"
                            required={true}
                            requiredMessage="Insert your Birthdate"
                            converter={ShortDateConverter}
                            converterMessage="Enter a date with format dd.MM.yyyy"/>
              </div>
              <div className="clear"/>
              <HMessage styleClass="iceMsgError inputFieldLabel"
                        for="firstNameInput" id="firstNameErrorMessage"/>
              <HMessage styleClass="iceMsgError inputFieldLabel"
                        for="lastNameInput" id="lastNameErrorMessage"/>
              <HMessage styleClass="iceMsgError inputFieldLabel"
                        for="birthDateInput" id="birthDateErrorMessage"/>
            </HPanelGroup>
            <HPanelGroup id="luggageContainer" layout="block"
                         styleClass="contentLevelContainer blockArea">
              <span className="iceOutTxt masInfoFieldLabel minindented">Select the desired amount of luggage</span>
              <HSelectOneRadio id="luggageRadio"
                               styleClass="iceSelOneRb masInfoInputField"
                               required={true}
                               layout="pageDirection"
                               requiredMessage="Select the amount of luggage you want to check in"
                               converter={IntegerConverter}
                               value="currentPassenger.luggageCount">
                <FSelectItems id="luggageNumbers"
                              value={this.luggageItems}/>
              </HSelectOneRadio>
              <div className="clear"/>
            </HPanelGroup>

            <HCommandButton value="Cancel"
                            action={this.props.cancel}
                            id="cancelBookingButton"
                            styleClass="iceCmdBtn btnOption"/>
            <HCommandButton immediate={true} action={this.back}
                            value="Back"
                            id="backButton"
                            styleClass="iceCmdBtn btnOption"/>
            <HCommandButton value="Continue"
                            id="continueButton"
                            action={this.next}
                            styleClass="iceCmdBtn btnOption"/>

            <IcePanelPopup id="passportHelpPopup"
                           visible={this.state.passportHelp}
                           draggable={false}
                           styleClass="popup frameHolder" autoCentre={true}>
              <FFacet name="body">
                <div id="iFrameWrapper">
                  <IceOutputText styleClass="iceOutTxt">
                    Your passport number should start with P and consist of 5
                    numbers <br/>
                    Your id card number should consist of 5 numbers
                  </IceOutputText>
                </div>
              </FFacet>
            </IcePanelPopup>
          </HForm>
      );
    } else {
      return <div></div>;
    }
  }
}