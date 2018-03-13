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
import PassengerService from '../../service/PassengerService';

export default class PassengerForm extends React.Component {
  static propTypes = {
    selectedFlight: PropTypes.instanceOf(Flight).isRequired,
    cancel: PropTypes.func.isRequired,
    back: PropTypes.func.isRequired,
    bookingFormData: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      passengerFormVisible: true,
      bookingDetailsVisible: false,
      data: this.props.bookingFormData,
      currentPassengerIndex: 0,
      forceEdit: false,
      existingUser: false,
      passportHelp: false,
    };

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

  next() {
    if (this.passengerForm.hasError()) {
      return;
    }

    if (this.state.currentPassengerIndex + 1 === this.passengers.length) {
      return this.setState({
        passengerFormVisible: false,
        bookingDetailsVisible: true,
      });
    }

    // save current data
    this.state.data = this.passengerForm.state.data;
    // save entered passenger data
    this.passengers[this.state.currentPassengerIndex] = this.currentPassenger;

    // increase index
    this.state.currentPassengerIndex++;
    this.state.data.currentPassenger = this.passengers[this.state.currentPassengerIndex];

    // inform about change
    this.setState({
      data: this.state.data,
      forceEdit: false,
      existingUser: false,
      currentPassengerIndex: this.state.currentPassengerIndex,
    });
  }

  back() {
    if (this.state.currentPassengerIndex === 0) {
      return this.props.back();
    }
    // save current data
    this.state.data = this.passengerForm.state.data;
    // save entered passenger data
    this.passengers[this.state.currentPassengerIndex] = this.currentPassenger;

    // decrease index
    this.state.currentPassengerIndex--;
    // set last passenger as current
    this.state.data.currentPassenger = this.passengers[this.state.currentPassengerIndex];

    // inform about change
    this.setState({
      data: this.state.data,
      forceEdit: false,
      existingUser: false,
      currentPassengerIndex: this.state.currentPassengerIndex,
    });
  }

  toggleForceEdit() {
    this.setState({
      forceEdit: !this.state.forceEdit,
    });
  }

  /**
   * originally performed on BE
   * but this is no longer required
   * @param {JsfElement} input
   */
  validateForm(input) {
    let key;
    if (input.props.id === 'idCardNumberInput') {
      key = 'idCardNumber';
    } else {
      key = 'passportNumber';
    }

    let found = 0;
    for (let passenger of this.passengers) {
      if (passenger[key] && passenger[key]
          === this.currentPassenger[key]) {
        found++;
      }
    }

    const msg = 'This passenger is already registered';
    if (found > 1) {
      input.hasError = true;
      input.errorMessage = msg;
      // more than one card with the same number exists
      this.passengerForm.updateMessages(input);
      return false;
    }
    return true;
  }

  togglePassportHelp() {
    this.setState({
      passportHelp: !this.state.passportHelp,
    });
  }

  /**
   *
   * @param {JsfElement} input
   * @param {string} render
   */
  async passportIdListener(input, render) {
    // only get when something was entered
    if (this.currentPassenger.passportNumber !== '' ||
        this.currentPassenger.idCardNumber !== '') {
      // first validate input
      if (this.validateForm(input)) {
        let passengers = await PassengerService.getPassengers(
            input.props.id === 'passportNumberInput' ?
                this.currentPassenger.passportNumber :
                '',
            input.props.id === 'idCardNumberInput' ?
                this.currentPassenger.idCardNumber :
                '');
        if (passengers) {
          this.currentPassenger = passengers[0];
          this.setState({
            data: this.state.data,
            existingUser: true,
            forceEdit: false,
          });
        }
      }
    }
  }

  render() {
    if (this.state.passengerFormVisible) {
      // use passenger index as key, so the form re-mounts after next/back
      return (
          <HForm key={this.state.currentPassengerIndex} ref={(form) => {
            this.passengerForm = form;
          }} id="passengerData" styleClass="ice-skin-rime"
                 data={this.state.data}>
            <div className="inputFieldGroup">
              <span
                  className="iceOutTxt headerLabel">Enter Data for Passenger #{this.state.currentPassengerIndex +
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