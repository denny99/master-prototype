import React from 'react';
import PropTypes from 'prop-types';
import CCFlightDetails from '../cc/CCFlightDetails';
import Flight from '../../entity/Flight';
import HPanelGroup from '../../jsf/components/HPanelGroup';
import HOutputText from '../../jsf/components/HOutputText';
import FConvertNumber from '../../jsf/components/FConvertNumber';
import HCommandButton from '../../jsf/components/HCommandButton';
import HOutputLabel from '../../jsf/components/HOutputLabel';
import HMessage from '../../jsf/components/HMessage';
import HForm from '../../jsf/components/HForm';
import CChoose from '../../jsf/components/CChoose';
import CWhen from '../../jsf/components/CWhen';
import COtherwise from '../../jsf/components/COtherwise';
import IceSelectBooleanCheckbox from '../../jsf/components/IceSelectBooleanCheckbox';

export default class BookingDetails extends React.Component {
  static propTypes = {
    back: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
    selectedFlight: PropTypes.instanceOf(Flight).isRequired,
    data: PropTypes.object,
  };

  render() {
    return (
        <React.Fragment>
          <h2>Booking Overview</h2>
          <HForm id="bookingDetails" data={this.props.data}>
            <!-- show all entered data -->
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
                               value="passengerCount"/>
                  <span className="iceOutTxt kdInputFieldLabel"
                        style={{width: '200px'}}>Flight Costs:</span>
                  <HOutputText styleClass="iceOutTxt kdInputFieldLabel"
                               value="flightCosts">
                    <FConvertNumber pattern="##,###" groupingUsed={true}
                                    locale="de"/>
                  </HOutputText>
                  <HOutputText styleClass="iceOutTxt kdInputFieldLabel"
                               rendered="travelInsurance"
                               value="Travel Insurance"
                  />
                </div>
              </HPanelGroup>
            </HPanelGroup>
            <HPanelGroup layout="block"
                         styleClass="contentLevelContainer blockArea">
              <div className="inputFieldGroup">
                <span className="iceOutTxt headerLabel">Passenger Data</span>
              </div>
              // TODO
              <ui:repeat value="passengers" var="passenger">
                <HPanelGroup layout="block">
                  <div className="clear" style={{height: '6px'}}/>
                  <div className="inputFieldGroup minindented">
                    <CChoose>
                      <!-- if other country -->
                      <CWhen test={this.props.selectedFlight.foreignTravel()}>
                        <!-- passport -->
                        <span className="iceOutTxt kdInputFieldLabel"
                              style={{width: '200px'}}>Passenger Passport:</span>
                        <HOutputText styleClass="iceOutTxt kdInputFieldLabel"
                                     value="passenger.passportNumber"/>
                      </CWhen>
                      <COtherwise>
                        <!-- id card -->
                        <span className="iceOutTxt kdInputFieldLabel"
                              style={{width: '200px'}}>Passenger Id Card:</span>
                        <HOutputText styleClass="iceOutTxt kdInputFieldLabel"
                                     value="passenger.idCardNumber"/>
                      </COtherwise>
                    </CChoose>
                    <span className="iceOutTxt kdInputFieldLabel"
                          style={{width: '200px'}}>Passenger Firstname:</span>
                    <HOutputText styleClass="iceOutTxt kdInputFieldLabel"
                                 value="passenger.firstName"/>
                    <span className="iceOutTxt kdInputFieldLabel"
                          style={{width: '200px'}}>Passenger Lastname:</span>
                    <HOutputText styleClass="iceOutTxt kdInputFieldLabel"
                                 value="passenger.lastName"/>
                    <span className="iceOutTxt kdInputFieldLabel"
                          style={{width: '200px'}}>Passenger Birthdate:</span>
                    <HOutputText styleClass="iceOutTxt kdInputFieldLabel"
                                 value="passenger.birthDay"
                                 converter="de.uni.frankfurt.ShortDateConverter"/>
                    <span className="iceOutTxt kdInputFieldLabel"
                          style={{width: '200px'}}>Passenger # Luggage:</span>
                    <HOutputText styleClass="iceOutTxt kdInputFieldLabel"
                                 value="passenger.luggageCount"/>
                  </div>
                </HPanelGroup>
              </ui:repeat>
            </HPanelGroup>

            <HPanelGroup layout="block"
                         styleClass="contentLevelContainer blockArea">
              <HPanelGroup id="tacDiv">
                <IceSelectBooleanCheckbox id="tacCheckbox"
                                          validator={this.validateTac}/>
                <HOutputLabel id="tacCheckboxLabel" for="tacCheckbox">Accept
                  TAC</HOutputLabel>

                <HMessage styleClass="iceMsgError inputFieldLabel"
                          for="tacCheckbox" id="tacErrorMessage"/>
              </HPanelGroup>
              // TODO
              <ace:tooltip id="tacTooltip" for="tacDiv"
                           speechBubble={false} showEffect="slide"
                           hideEffect="slide"
                           showDelay={200} hideDelay={100} position="bottomLeft"
                           targetPosition="topRight" showEffectLength={200}
                           hideEffectLength={200} styleClass="icePnlTlTip">
                <span className="iceOutTxt"> Some imaginary TAC text. </span>
              </ace:tooltip>
            </HPanelGroup>

            <HCommandButton value="Cancel"
                            action={this.props.cancel}
                            id="cancelBookingButton"
                            styleClass="iceCmdBtn btnOption"/>
            <HCommandButton value="Back"
                            immediate={true}
                            action={this.props.back}
                            styleClass="iceCmdBtn btnOption"/>
            <HCommandButton value="Finish"
                            id="finishButton"
                            action="#{bookingBean.confirmBooking}"
                            styleClass="iceCmdBtn btnOption"/>

            // TODO
            <ace:dialog id="infoPopup" header="Information"
                        visible="#{bookingBean.showInfo}" closable={false}
                        modal={true}
                        draggable={false} resizable={false} showEffect="fade"
                        hideEffect="fade" styleClass="popup" showHeader={true}>
              <div className="contentLevelContainer">
                <HPanelGroup layout="block" styleClass="inputFieldGroup">
                  <div className="inputFieldGroup center">
                    <span className="iceOutTxt inputFieldLabel">When clicking OK, you're booking the flight binding</span>
                  </div>
                  <div className="inputFieldGroup center">
                    // TODO
                    <ice:commandButton value="OK" id="as_info_ok"
                                       action={this.finishBooking}
                                       immediate={true}
                                       partialSubmit={true}
                                       styleClass="btnOption"/>
                  </div>
                </HPanelGroup>
              </div>
            </ace:dialog>
          </HForm>
        </React.Fragment>
    );
  }
}