import React from 'react';
import PropTypes from 'prop-types';
import HPanelGroup from '../../jsf/components/HPanelGroup';
import UIFragment from '../../jsf/components/UIFragment';
import CChoose from '../../jsf/components/CChoose';
import CWhen from '../../jsf/components/CWhen';
import COtherwise from '../../jsf/components/COtherwise';
import HOutputText from '../../jsf/components/HOutputText';
import CIf from '../../jsf/components/CIf';
import HForm from '../../jsf/components/HForm';
import HCommandButton from '../../jsf/components/HCommandButton';
import Flight from '../../entity/Flight';
import DateConverter from '../../converter/DateConverter';

export default class CCFlightDetails extends React.Component {
  static propTypes = {
    flight: PropTypes.instanceOf(Flight).isRequired,
    headline: PropTypes.bool,
    standalone: PropTypes.bool,
    back: PropTypes.func,
  };

  render() {
    return (
        <div>
          <HPanelGroup layout="block"
                       styleClass="contentLevelContainer blockArea"
                       id="flightDetailsContainer">
            <UIFragment rendered={this.props.headline}>
              <div className="inputFieldGroup">
                <span className="iceOutTxt headerLabel">Flight Details</span>
              </div>
            </UIFragment>
            <HPanelGroup layout="block">
              <div className="clear" style={{height: '6px'}}/>
              <div className="inputFieldGroup minindented">
                    <span className="iceOutTxt kdInputFieldLabel"
                          style={{width: '200px'}}>Flight Type</span>
                <CChoose>
                  <CWhen test={this.props.flight.foreignTravel()}>
                            <span className="iceOutTxt kdInputFieldLabel"
                                  style={{width: '200px'}}>International Flight</span>
                  </CWhen>
                  <COtherwise>
                            <span className="iceOutTxt kdInputFieldLabel"
                                  style={{width: '200px'}}>National Flight</span>
                  </COtherwise>
                </CChoose>
                <br/>
                <br/>
                <span className="iceOutTxt kdInputFieldLabel"
                      style={{width: '200px'}}>Aircraft Model:</span>
                <HOutputText styleClass="iceOutTxt kdInputFieldLabel"
                             value={this.props.flight.aircraft.model}/>
                <span className="iceOutTxt kdInputFieldLabel"
                      style={{width: '200px'}}>Departure Airport:</span>
                <HOutputText styleClass="iceOutTxt kdInputFieldLabel"
                             value={this.props.flight.departure.code + ' ' +
                             this.props.flight.departure.city}/>
                <span className="iceOutTxt kdInputFieldLabel"
                      style={{width: '200px'}}>Arrival Airport:</span>
                <HOutputText styleClass="iceOutTxt kdInputFieldLabel"
                             value={this.props.flight.arrival.code + ' ' +
                             this.props.flight.arrival.city}/>
                <span className="iceOutTxt kdInputFieldLabel"
                      style={{width: '200px'}}>Departure Time:</span>
                <HOutputText styleClass="iceOutTxt kdInputFieldLabel"
                             value={this.props.flight.dateTime}
                             converter={DateConverter}/>
              </div>
            </HPanelGroup>
          </HPanelGroup>

          <CIf test={this.props.standalone}>
            <HForm id="pageNav">
              <HCommandButton value="Back"
                              id="backButton"
                              action={this.props.back}
                              styleClass="iceCmdBtn btnOption"/>
            </HForm>
          </CIf>
        </div>
    );
  }
}
