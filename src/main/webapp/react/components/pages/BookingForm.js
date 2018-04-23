import React from 'react';
import PropTypes from 'prop-types';
import CCFlightDetails from '../cc/CCFlightDetails';
import Flight from '../../entity/Flight';
import {
  FFacet, HCommandButton, HForm, HInputHidden, HInputText, HMessage,
  HOutputLabel, HPanelGroup, HSelectBooleanCheckbox, IceOutputText,
  IcePanelGroup, IcePanelTooltip, UiDefine, ValidationResponse,
} from 'react-jsf';
import IntegerConverter from '../../converter/IntegerConverter';
import PassengerForm from './PassengerForm';
import AjaxService from '../../service/AjaxService';
import BaseTemplate from '../template/BaseTemplate';

export default class BookingForm extends React.Component {
  static propTypes = {
    selectedFlight: PropTypes.instanceOf(Flight).isRequired,
    cancel: PropTypes.func.isRequired,
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
      this.passengerCountOutput.setExternalError(false);
    }
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      bookingFormVisible: true,
      passengerFormVisible: false,
      data: {
        passengerCount: 1,
      },
    };

    this.validatePassengerCount = this.validatePassengerCount.bind(this);
    this.showPassengerForm = this.showPassengerForm.bind(this);
    this.hidePassengerForm = this.hidePassengerForm.bind(this);
    this.updateSlider = this.updateSlider.bind(this);
  }

  showPassengerForm() {
    if (this.bookingForm.hasError()) {
      return;
    }

    this.setState({
      bookingFormVisible: false,
      passengerFormVisible: true,
    });
  }

  hidePassengerForm() {
    this.setState({
      bookingFormVisible: true,
      passengerFormVisible: false,
    });
  }

  /**
   * validates the entered amount of passengers
   * @return {Promise<ValidationResponse>}
   */
  async validatePassengerCount() {
    // input validates itself after init, so ref is not set use 1 as default value
    return AjaxService.validatePassengerCount(this.props.selectedFlight,
        this.bookingForm ? this.bookingForm.state.data.passengerCount : 1);
  }

  componentDidMount() {
    this.sliderChange = false;
    this.slider = $('#passengerCountSlider').slider({
      max: this.props.selectedFlight.aircraft.passengerCount,
      value: this.bookingForm.state.data.passengerCount,
      change: (event, ui) => {
        this.bookingForm.state.data.passengerCount = ui.value;
        this.sliderChange = true;
        this.passengerCountOutput.handleChange({
          target: ui,
        });
      },
    });
  }

  componentDidUpdate() {
    // reapply slider if necessary
    if (this.state.bookingFormVisible) {
      this.componentDidMount();
    }
  }

  render() {
    if (this.state.bookingFormVisible) {
      return (
          <BaseTemplate>
            <UiDefine name='content'>
              <HForm ref={(form) => {
                this.bookingForm = form;
              }} id="bookingData" data={this.state.data}
                     styleClass="ice-skin-rime">
                <CCFlightDetails headline={true} standalone={false}
                                 flight={this.props.selectedFlight}/>
                <HPanelGroup id="basicData" layout="block"
                             styleClass="contentLevelContainer blockArea">
                  <div className="inputFieldGroup">
                    <span className="iceOutTxt headerLabel">Basic Data</span>
                  </div>
                  <HPanelGroup layout="block" id="sliderGroup"
                               styleClass="indented topMargin">
                    <div className="inputFieldGroup center"
                         style={{width: '450px'}}>
                      <span className="iceOutTxt iceOutLbl ssLabel">Select desired amount of passengers</span>
                    </div>
                    <div id="passengerContainer" className="blockArea">
                      <div className="inputFieldGroup"
                           id="passengerAmountContainer">
                        <IcePanelGroup id="passengerTooltipBubble"
                                       panelTooltip="passengerTooltip"
                                       style={{
                                         position: 'relative',
                                         top: '-15px',
                                       }}
                                       styleClass="infoBubble"/>
                        <div className="clear"/>
                        <div id="sliderDiv" className="inputFieldGroup center">
                          <div className="inputFieldGroup center"
                               style={{marginTop: '-15px'}}>
                            <HInputText ref={(input) => {
                              this.passengerCountOutput = input;
                            }} value="passengerCount"
                                        id="passengerCountOutput"
                                        style={{
                                          color: '#003B78 !important',
                                          textAlign: 'center',
                                        }}
                                        onchange={this.updateSlider}
                                        validator={this.validatePassengerCount}
                                        converter={IntegerConverter}
                                        converterMessage="Enter only Numbers"/>
                            <span
                                style={{marginLeft: '4px'}}># Passengers</span>
                          </div>
                          <div style={{position: 'relative', bottom: '0px'}}>
                            <div id="slider_div">
                              <div id="passengerCountSlider"
                                   style={{
                                     position: 'relative',
                                     top: '6px',
                                     width: '133px',
                                   }}>
                                <img id="sliderImage"
                                     src="/resources/images/bar150.gif"
                                     width="150"
                                     height="12"
                                     alt="" className="sliderImg"/>
                              </div>
                            </div>

                            <IceOutputText id="costs"
                                           styleClass="ssInfoFieldLabel2">
                              Costs p.P. {this.props.selectedFlight.costs}
                            </IceOutputText>
                            <span>€</span>
                          </div>

                          <HInputHidden id="maxSliderTickHidden"
                                        value={this.props.selectedFlight.aircraft.passengerCount}/>
                        </div>
                      </div>
                    </div>

                    <IcePanelTooltip id="passengerTooltip" hideOn="mouseout">
                      <FFacet name="body">
                        <div>
                          <span className="iceOutTxt">Use the slider or the input to set the amount of passengers</span>
                        </div>
                      </FFacet>
                    </IcePanelTooltip>
                  </HPanelGroup>
                </HPanelGroup>
                <HMessage id="costMsg"
                          style={{width: '404px', textAlign: 'center'}}
                          styleClass="iceMsgError inputFieldLabel minindented"
                          for="passengerCountOutput"/>

                <HPanelGroup layout="block"
                             styleClass="contentLevelContainer blockArea">
                  <div className="indented inputFieldGroup"
                       style={{marginTop: '5px'}}>
                    <HSelectBooleanCheckbox id="insuranceCB"
                                            value="travelInsurance">
                    </HSelectBooleanCheckbox>
                    <HOutputLabel id="insuranceLabel" for="insuranceCB"
                                  style={{position: 'relative', top: '-2px'}}
                                  styleClass="InfoFieldLabel minindented">Travel
                      Insurance
                    </HOutputLabel>
                    <div className="clear"/>
                  </div>
                </HPanelGroup>
                <HCommandButton value="Cancel"
                                action={this.props.cancel}
                                id="cancelBookingButton"
                                styleClass="iceCmdBtn btnOption"/>
                <HCommandButton id="continueButton" value="Continue"
                                action={this.showPassengerForm}
                                styleClass="iceCmdBtn btnOption"/>
              </HForm>
            </UiDefine>
          </BaseTemplate>
      );
    } else {
      return <PassengerForm selectedFlight={this.props.selectedFlight}
                            cancel={this.props.cancel}
                            back={this.hidePassengerForm}
                            bookingFormData={this.bookingForm.state.data}/>;
    }
  }
}