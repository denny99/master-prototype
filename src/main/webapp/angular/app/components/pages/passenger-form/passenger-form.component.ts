import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {ShortDatePipe} from '../../../converter/short-date-pipe';
import Flight from '../../../entity/Flight';
import Passenger from '../../../entity/Passenger';
import {IAjaxEventParameter} from '../../../jsf/interfaces/ajax-event-parameter';
import {SelectItem} from '../../../jsf/objects/select-item';
import {ConversationService} from '../../../jsf/services/conversation.service';
import {PassengerService} from '../../../services/passenger.service';

@Component({
  selector: 'app-passenger-form',
  templateUrl: './passenger-form.component.html',
  styleUrls: ['./passenger-form.component.css'],
})
export class PassengerFormComponent {
  private currentPassengerIndex: 0;
  private forceEdit = false;
  private existingUser = false;
  private passportHelp = false;
  private passengers: Array<Passenger> = [];
  private luggageItems: Array<SelectItem> = [];
  shortDateConverter = new ShortDatePipe('de-DE');
  private selectedFlight: Flight;

  constructor(
      private passengerService: PassengerService,
      private router: Router,
      private conversationService: ConversationService) {
    // setup radio items
    this.luggageItems.push(new SelectItem(0, 'No luggage'));
    this.luggageItems.push(new SelectItem(1, '1 Bag'));
    this.luggageItems.push(new SelectItem(2, '2 Bags'));
    this.luggageItems.push(new SelectItem(3, '3 Bags'));

    if (!this.conversationService.isActive()) {
      console.error('attempted to visit site without selecting a flight');
      router.navigateByUrl('pages/flightOverview').then().catch((e) => {
        console.error(e);
      });
    } else {
      this.selectedFlight = this.conversationService.conversation.getProperty(
          'selectedFlight');

      if (!this.conversationService.conversation.hasProperty(
              'passengers')) {
        // create empty passengers
        for (let i = 0; i <
        this.conversationService.conversation.getProperty(
            'passengerCount'); i++) {
          this.passengers.push(new Passenger());
        }
      } else {
        this.passengers = this.conversationService.conversation.getProperty(
            'passengers');
      }
    }
  }

  get currentPassenger(): Passenger {
    return this.passengers[this.currentPassengerIndex];
  }

  set currentPassenger(passenger: Passenger) {
    this.passengers[this.currentPassengerIndex] = passenger;
  }

  async next() {
    if (this.currentPassengerIndex + 1 === this.passengers.length) {
      try {
        return await this.router.navigateByUrl('pages/bookingDetails');
      } catch (e) {
        console.error(e);
      }
    }

    // increase index
    this.currentPassengerIndex++;
    this.forceEdit = false;
    this.existingUser = false;
  }

  async back() {
    // did we trigger back function on next page
    // save current data

    if (this.currentPassengerIndex === 0) {
      try {
        return await this.router.navigateByUrl('pages/bookingForm');
      } catch (e) {
        console.error(e);
      }
    }

    // decrease index
    this.currentPassengerIndex--;
    this.forceEdit = false;
    this.existingUser = false;
  }

  toggleForceEdit() {
    this.forceEdit = !this.forceEdit;
  }

  togglePassportHelp() {
    this.passportHelp = !this.passportHelp;
  }

  /**
   *
   * @param {IAjaxEventParameter} input
   */
  async passportIdListener(input: IAjaxEventParameter) {
    const passengers = await this.passengerService.getPassengers(
        input.exec.simpleId === 'passportNumberInput' ?
            this.currentPassenger.passportNumber :
            '',
        input.exec.simpleId === 'idCardNumberInput' ?
            this.currentPassenger.idCardNumber :
            '');
    if (passengers) {
      this.currentPassenger = passengers[0];
      this.forceEdit = false;
      this.existingUser = true;
    }
  }

  validateForm() {

  }
}
