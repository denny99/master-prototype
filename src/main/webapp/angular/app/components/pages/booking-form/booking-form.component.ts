import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {IntegerPipe} from '../../../converter/integer-pipe';
import Flight from '../../../entity/Flight';
import {HInputTextComponent} from '../../../jsf/components/h-input-text/h-input-text.component';
import ValidationResponse from '../../../jsf/objects/validation-response';
import {ConversationService} from '../../../jsf/services/conversation.service';
import {JsfInput} from '../../../jsf/superclass/jsf-input';
import {AjaxService} from '../../../services/ajax.service';

declare let $: any;

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css'],
})
export class BookingFormComponent implements AfterViewInit {
  private passengerCount = 1;
  private maxPassengers = 10;
  private travelInsurance = false;
  private selectedFlight: Flight;
  private integerConverter = new IntegerPipe();
  // it is not possible to annotate this properly with the jqueryui types
  private slider: any;

  @ViewChild('passengerCountOutput')
  private passengerCountOutput: HInputTextComponent;

  constructor(
      private ajaxService: AjaxService,
      private router: Router,
      private conversationService: ConversationService) {
    if (!this.conversationService.isActive()) {
      console.error('attempted to visit site without selecting a flight');
      router.navigateByUrl('pages/flightOverview').then().catch((e) => {
        console.error(e);
      });
    } else {
      this.selectedFlight = this.conversationService.conversation.getProperty(
          'selectedFlight');
      this.maxPassengers = this.selectedFlight.aircraft.passengerCount;

      // we already have data in conversation, restore data
      if (this.conversationService.conversation.hasProperty('passengerCount')) {
        this.passengerCount = this.conversationService.conversation.getProperty(
            'passengerCount');
        this.travelInsurance = this.conversationService.conversation.getProperty(
            'travelInsurance');
      }
    }

    // this function is used inside of the input field
    this.validatePassengerCount = this.validatePassengerCount.bind(this);
  }

  ngAfterViewInit() {
    this.slider = $('#passengerCountSlider').slider({
      max: this.maxPassengers,
      value: this.passengerCount,
      change: (event, ui) => {
        this.passengerCount = ui.value;
      },
    });
  }

  async updateSlider(): Promise<void> {
    const currentValue = this.passengerCount;
    const maxValue = this.maxPassengers;
    const minValue = 1;
    if (minValue <= currentValue && currentValue <= maxValue) {
      // to avoid a loop only change when changed through direct input
      this.slider.slider('value', currentValue);
      try {
        await this.passengerCountOutput.validate();
      } catch (e) {
        console.error(e);
      }
    }
  }

  /**
   * validates the entered amount of passengers
   * @param {JsfInput} element
   * @returns {Promise<ValidationResponse>}
   */
  async validatePassengerCount(element: JsfInput): Promise<ValidationResponse> {
    // input validates itself after init, so ref is not set use 1 as default value
    return this.ajaxService.validatePassengerCount(
        this.selectedFlight, element.value);
  }

  async createPassengers(): Promise<void> {
    try {
      // save date in conversation
      this.conversationService.conversation.setProperty('passengerCount',
          this.passengerCount);
      this.conversationService.conversation.setProperty('travelInsurance',
          this.travelInsurance);
      await this.router.navigateByUrl('pages/passengerForm');
    } catch (e) {
      console.error(e);
    }
  }

  async cancelBooking() {
    try {
      // save date in conversation
      this.conversationService.endConversation();
      await this.router.navigateByUrl('pages/flightOverview');
    } catch (e) {
      console.error(e);
    }
  }
}
