import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {ShortDatePipe} from '../../../converter/short-date-pipe';
import Flight from '../../../entity/Flight';
import Passenger from '../../../entity/Passenger';
import ValidationResponse from '../../../jsf/objects/validation-response';
import {ConversationService} from '../../../jsf/services/conversation.service';
import {BookingService} from '../../../services/booking.service';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css'],
})
export class BookingDetailsComponent {
  private flightCosts: number;
  private passengerCount: number;
  private tac = false;
  private showInfo = false;
  private shortDateConverter = new ShortDatePipe('de-DE');

  constructor(
      private bookingService: BookingService,
      private router: Router,
      private conversationService: ConversationService) {
    if (!this.conversationService.isActive()) {
      console.error('attempted to visit site without selecting a flight');
      router.navigateByUrl('pages/flightOverview').then().catch((e) => {
        console.error(e);
      });
    } else {
      this.passengerCount = this.passengers.length;
      this.flightCosts = this.passengerCount * this.selectedFlight.costs;
    }

    this.validateTac = this.validateTac.bind(this);
  }

  get passengers(): Array<Passenger> {
    return this.conversationService.conversation.getProperty(
        'passengers') || [];
  }

  get travelInsurance(): boolean {
    return this.conversationService.conversation.getProperty(
        'travelInsurance');
  }

  get selectedFlight(): Flight {
    return this.conversationService.conversation.getProperty(
        'selectedFlight');
  }

  validateTac(): ValidationResponse {
    return {
      error: !this.tac,
      message: 'You have to accept the TAC',
    };
  }

  async cancelBooking() {
    try {
      this.conversationService.endConversation();
      await this.router.navigateByUrl('pages/flightOverview');
    } catch (e) {
      console.error(e);
    }
  }

  async back() {
    try {
      await this.router.navigateByUrl('pages/passengerForm');
    } catch (e) {
      console.error(e);
    }
  }

  confirmBooking() {
    this.showInfo = true;
  }

  async finishBooking() {
    try {
      // POST to backend
      await this.bookingService.createBooking(this.selectedFlight,
          this.travelInsurance, this.tac, this.passengers);
      this.conversationService.endConversation();

      await this.router.navigateByUrl('pages/bookingSuccess');
    } catch (e) {
      console.error(e);
    }
  }
}
