import React from 'react';
import PropTypes from 'prop-types';
import CCFlightDetails from '../cc/CCFlightDetails';
import Flight from '../../entity/Flight';
import {
  AceDialog, AceTooltip, CChoose, COtherwise, CWhen, FConvertNumber,
  HCommandButton, HForm, HMessage, HOutputLabel, HOutputText, HPanelGroup,
  IceCommandButton, IceSelectBooleanCheckbox, UiDefine, UiRepeat,
} from 'react-jsf';
import BookingSuccess from './BookingSuccess';
import ShortDateConverter from '../../converter/ShortDateConverter';
import BookingService from '../../service/BookingService';
import BaseTemplate from '../template/BaseTemplate';

export default class BookingDetails extends React.Component {
  static propTypes = {
    back: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
    selectedFlight: PropTypes.instanceOf(Flight).isRequired,
    data: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      showInfo: false,
      bookingDetailsVisible: true,
      bookingSuccessVisible: false,
    };

    this.confirmBooking = this.confirmBooking.bind(this);
    this.finishBooking = this.finishBooking.bind(this);
    this.validateTac = this.validateTac.bind(this);
  }

  /**
   * ensure checkbox is set
   * @return {{error: boolean}}
   */
  validateTac(input) {
    return {
      error: !input.value,
      message: 'You have to accept the TAC',
    };
  }

  async finishBooking() {
    let data = this.detailsForm.state.data;
    // POST to backend
    await BookingService.createBooking(this.props.selectedFlight,
        data.travelInsurance, data.tac, data.passengers);

    this.setState({
      bookingDetailsVisible: false,
      bookingSuccessVisible: true,
    });
  }

  confirmBooking() {
    this.setState({
      showInfo: true,
    });
  }

  render() {
    if (this.state.bookingDetailsVisible) {
      return (
          <BaseTemplate>
            <UiDefine name='content'>
              <h2>Booking Overview</h2>
              <HForm key={1} id="bookingDetails" data={this.props.data}
                     ref={(form) => this.detailsForm = form}>
                <CCFlightDetails headline={true} standalone={false}
                                 flight={this.props.selectedFlight}/>

                <HPanelGroup layout="block"
                             styleClass="contentLevelContainer blockArea">
                  <div className="inputFieldGroup">
                    <span className="iceOutTxt headerLabel">Basic Data</span>
                  </div>
                  <HPanelGroup layout="block">
                    <div className="clear" style={{height: '6px'}}/>
                    <div className="inputFieldGroup minindented">
                        <span className="iceOutTxt kdInputFieldLabel"
                              style={{width: '200px'}}>Passenger Count:</span>
                      <HOutputText styleClass="iceOutTxt kdInputFieldLabel"
                                   value={this.props.data.passengerCount}/>
                      <span className="iceOutTxt kdInputFieldLabel"
                            style={{width: '200px'}}>Flight Costs:</span>
                      <HOutputText styleClass="iceOutTxt kdInputFieldLabel"
                                   value={this.props.data.passengerCount *
                                   this.props.selectedFlight.costs}>
                        <FConvertNumber pattern="###,##" groupingUsed={true}
                                        locale="de"/>
                      </HOutputText>
                      <HOutputText styleClass="iceOutTxt kdInputFieldLabel"
                                   rendered={this.props.data.travelInsurance}
                                   value="Travel Insurance"
                      />
                    </div>
                  </HPanelGroup>
                </HPanelGroup>
                <HPanelGroup layout="block"
                             styleClass="contentLevelContainer blockArea">
                  <div className="inputFieldGroup">
                    <span
                        className="iceOutTxt headerLabel">Passenger Data</span>
                  </div>
                  <UiRepeat value={this.props.data.passengers} var="passenger">
                    <HPanelGroup layout="block">
                      <div className="clear" style={{height: '6px'}}/>
                      <div className="inputFieldGroup minindented">
                        <CChoose>
                          <CWhen
                              test={this.props.selectedFlight.foreignTravel()}>
                          <span className="iceOutTxt kdInputFieldLabel"
                                style={{width: '200px'}}>Passenger Passport:</span>
                            <HOutputText
                                styleClass="iceOutTxt kdInputFieldLabel"
                                value="#[passenger.passportNumber]"/>
                          </CWhen>
                          <COtherwise>
                          <span className="iceOutTxt kdInputFieldLabel"
                                style={{width: '200px'}}>Passenger Id Card:</span>
                            <HOutputText
                                styleClass="iceOutTxt kdInputFieldLabel"
                                value="#[passenger.idCardNumber]"/>
                          </COtherwise>
                        </CChoose>
                        <span className="iceOutTxt kdInputFieldLabel"
                              style={{width: '200px'}}>Passenger Firstname:</span>
                        <HOutputText styleClass="iceOutTxt kdInputFieldLabel"
                                     value="#[passenger.firstName]"/>
                        <span className="iceOutTxt kdInputFieldLabel"
                              style={{width: '200px'}}>Passenger Lastname:</span>
                        <HOutputText styleClass="iceOutTxt kdInputFieldLabel"
                                     value="#[passenger.lastName]"/>
                        <span className="iceOutTxt kdInputFieldLabel"
                              style={{width: '200px'}}>Passenger Birthdate:</span>
                        <HOutputText styleClass="iceOutTxt kdInputFieldLabel"
                                     value="#[passenger.birthDay]"
                                     converter={ShortDateConverter}/>
                        <span className="iceOutTxt kdInputFieldLabel"
                              style={{width: '200px'}}>Passenger # Luggage:</span>
                        <HOutputText styleClass="iceOutTxt kdInputFieldLabel"
                                     value="#[passenger.luggageCount]"/>
                      </div>
                    </HPanelGroup>
                  </UiRepeat>
                </HPanelGroup>

                <HPanelGroup layout="block"
                             styleClass="contentLevelContainer blockArea">
                  <HPanelGroup id="tacDiv">
                    <IceSelectBooleanCheckbox id="tacCheckbox" value="tac"
                                              validator={this.validateTac}/>
                    <HOutputLabel id="tacCheckboxLabel" for="tacCheckbox">Accept
                      TAC</HOutputLabel>

                    <HMessage styleClass="iceMsgError inputFieldLabel"
                              for="tacCheckbox" id="tacErrorMessage"/>
                  </HPanelGroup>
                  <AceTooltip id="tacTooltip" for="tacDiv"
                              speechBubble={false} showEffect="slide"
                              hideEffect="slide"
                              showDelay={200} hideDelay={100}
                              position="bottomLeft"
                              targetPosition="topRight" showEffectLength={200}
                              hideEffectLength={200} styleClass="icePnlTlTip">
                    <span
                        className="iceOutTxt"> Some imaginary TAC text. </span>
                  </AceTooltip>
                </HPanelGroup>

                <HCommandButton value="Cancel"
                                immediate={true}
                                action={this.props.cancel}
                                id="cancelBookingButton"
                                styleClass="iceCmdBtn btnOption"/>
                <HCommandButton value="Back"
                                immediate={true}
                                action={this.props.back}
                                styleClass="iceCmdBtn btnOption"/>
                <HCommandButton value="Finish"
                                id="finishButton"
                                action={this.confirmBooking}
                                styleClass="iceCmdBtn btnOption"/>

                <AceDialog id="infoPopup" header="Information"
                           visible={this.state.showInfo} closable={false}
                           modal={true}
                           draggable={false} resizable={false} showEffect="fade"
                           hideEffect="fade" styleClass="popup"
                           showHeader={true}>
                  <div className="contentLevelContainer">
                    <HPanelGroup layout="block" styleClass="inputFieldGroup">
                      <div className="inputFieldGroup center">
                        <span className="iceOutTxt inputFieldLabel">When clicking OK, you're booking the flight binding</span>
                      </div>
                      <div className="inputFieldGroup center">
                        <IceCommandButton value="OK" id="as_info_ok"
                                          action={this.finishBooking}
                                          immediate={true}
                                          partialSubmit={true}
                                          styleClass="btnOption"/>
                      </div>
                    </HPanelGroup>
                  </div>
                </AceDialog>
              </HForm>
            </UiDefine>
          </BaseTemplate>
      );
    } else {
      return <BookingSuccess finish={this.props.cancel}/>;
    }
  }
}