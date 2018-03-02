import React from 'react';
import PropTypes from 'prop-types';
import HForm from '../../jsf/components/HForm';
import CCFlightDetails from '../cc/CCFlightDetails';
import Flight from '../../entity/Flight';
import HPanelGroup from '../../jsf/components/HPanelGroup';
import HInputText from '../../jsf/components/HInputText';
import IntegerConverter from '../../converter/IntegerConverter';
import IcePanelGroup from '../../jsf/components/IcePanelGroup';
import IceOutputText from '../../jsf/components/IceOutputText';
import HInputHidden from '../../jsf/components/HInputHidden';
import FFacet from '../../jsf/components/FFacet';
import HMessage from '../../jsf/components/HMessage';
import HCommandButton from '../../jsf/components/HCommandButton';
import FConvertNumber from '../../jsf/components/FConvertNumber';
import IcePanelTooltip from '../../jsf/components/IcePanelTooltip';

export default class BookingForm extends React.Component {
  static propTypes = {
    selectedFlight: PropTypes.instanceOf(Flight),
    cancel: PropTypes.func,
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
      bookingFormVisible: true,
      passengerFormVisible: false,
      data: {
        passengerCount: 1,
      },
    };

    this.validatePassengerCount = this.validatePassengerCount.bind(this);
    this.showPassengerForm = this.showPassengerForm.bind(this);
    this.hidePassengerForm = this.hidePassengerForm.bind(this);
  }

  showPassengerForm() {
    this.state = {
      bookingFormVisible: false,
      passengerFormVisible: true,
    };
  }

  hidePassengerForm() {
    this.state = {
      bookingFormVisible: true,
      passengerFormVisible: false,
    };
  }

  async validatePassengerCount() {

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

  render() {
    return (
        <HForm ref={(form) => {
          this.bookingForm = form;
        }} id="bookingData" data={this.state.data} styleClass="ice-skin-rime">
          <CCFlightDetails headline={true} standalone={false}
                           flight={this.props.selectedFlight}/>
          <HPanelGroup id="basicData" layout="block"
                       styleClass="contentLevelContainer blockArea">
            <div className="inputFieldGroup">
              <span className="iceOutTxt headerLabel">Basic Data</span>
            </div>
            <HPanelGroup layout="block" id="sliderGroup"
                         styleClass="indented topMargin">
              <div className="inputFieldGroup center" style={{width: '450px'}}>
                <span className="iceOutTxt iceOutLbl ssLabel">Select desired amount of passengers</span>
              </div>
              <div id="passengerContainer" className="blockArea">
                <div className="inputFieldGroup" id="passengerAmountContainer">
                  <IcePanelGroup id="passengerTooltipBubble"
                                 panelTooltip="passengerTooltip"
                                 style={{position: 'relative', top: '-15px'}}
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
                                  converterMessage="Enter only Numbers">
                        {/*<f:ajax event="blur" execute="@this" render="costMsg"*/}
                        {/*listener="#{bookingFormBean.costsListener}"/>*/}
                      </HInputText>
                      <span style={{marginLeft: '4px'}}># Passengers</span>
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
                               src="/resources/images/bar150.gif" width="150"
                               height="12"
                               alt="" className="sliderImg"/>
                        </div>
                      </div>

                      <IceOutputText id="costs"
                                     value={`Costs p.P. ${this.props.selectedFlight.costs}`}
                                     styleClass="ssInfoFieldLabel2">
                        <FConvertNumber pattern="##,###" groupingUsed={true}
                                        locale="de-DE"/>
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

          {/*<HPanelGroup layout="block"*/}
          {/*styleClass="contentLevelContainer blockArea">*/}
          {/*<div className="indented inputFieldGroup" style="margin-top: 5px;">*/}
          {/*<h:selectBooleanCheckbox id="insuranceCB"*/}
          {/*value="#{bookingFormBean.travelInsurance}">*/}
          {/*</h:selectBooleanCheckbox>*/}
          {/*<h:outputLabel id="insuranceLabel" for="insuranceCB"*/}
          {/*style="position:relative;top:-2px;"*/}
          {/*styleClass="InfoFieldLabel minindented">Travel*/}
          {/*Insurance*/}
          {/*</h:outputLabel>*/}
          {/*<div className="clear"/>*/}
          {/*</div>*/}
          {/*</HPanelGroup>*/}
          <HCommandButton value="Cancel"
                          action={this.props.cancel}
                          id="cancelBookingButton"
                          styleClass="iceCmdBtn btnOption"/>
          <HCommandButton id="continueButton" value="Continue"
                          action={this.showPassengerForm}
                          styleClass="iceCmdBtn btnOption"/>
        </HForm>
    );
  }
}