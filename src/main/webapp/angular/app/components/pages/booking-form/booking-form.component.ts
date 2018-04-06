import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {IntegerPipe} from '../../../converter/IntegerPipe';
import ValidationResponse from '../../../entity/ValidationResponse';
import {JsfInput} from '../../../jsf/superclass/jsf-input';
import {AjaxService} from '../../../services/ajax.service';
import {SessionDataService} from '../../../services/session-data.service';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css'],
})
export class BookingFormComponent implements OnInit {
  // TODO load/store in conversation service
  private passengerCount = 1;
  private maxPassengers = 10;
  private integerConverter = new IntegerPipe();
  private travelInsurance = false;

  constructor(
      private sessionService: SessionDataService,
      private ajaxService: AjaxService,
      private router: Router) {
    if (!this.sessionService.selectedFlight) {
      console.error('attempted to visit site without selecting a flight');
      router.navigateByUrl('pages/flightOverview').then().catch((e) => {
        console.error(e);
      });
    }

    // this function is used inside of the input field
    this.validatePassengerCount = this.validatePassengerCount.bind(this);
  }

  ngOnInit() {
  }

  updateSlider(): void {
  }

  /**
   * validates the entered amount of passengers
   * @param {JsfInput} element
   * @returns {Promise<ValidationResponse>}
   */
  async validatePassengerCount(element: JsfInput): Promise<ValidationResponse> {
    // input validates itself after init, so ref is not set use 1 as default value
    return this.ajaxService.validatePassengerCount(
        this.sessionService.selectedFlight, element.value);
  }

  createPassengers() {
    // TODO save date in conversation
  }
}
