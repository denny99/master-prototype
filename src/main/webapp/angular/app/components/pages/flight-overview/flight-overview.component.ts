import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LongDatePipe} from '../../../converter/LongDatePipe';
import ApiSearchResponse from '../../../entity/ApiSearchResponse';
import Flight from '../../../entity/Flight';
import {SelectItem} from '../../../jsf/objects/select-item';
import {ConversationService} from '../../../jsf/services/conversation.service';
import {FlightService} from '../../../services/flight.service';
import {SessionDataService} from '../../../services/session-data.service';

@Component({
  selector: 'app-flight-overview',
  templateUrl: './flight-overview.component.html',
  styleUrls: ['./flight-overview.component.css'],
})
export class FlightOverviewComponent implements OnInit {
  private PAGE_SIZE = 10;
  private flights: ApiSearchResponse<Flight> = new ApiSearchResponse<Flight>();
  private arrivalFilter: string;
  private sortOrder: string;
  private sortOptions: Array<SelectItem> = [];
  private searched: boolean;
  private dateConverter = new LongDatePipe('de-DE');

  constructor(
      private flightService: FlightService, private router: Router,
      private sessionService: SessionDataService,
      private conversationService: ConversationService) {
    this.sortOptions.push(new SelectItem('asc', 'Ascending'));
    this.sortOptions.push(new SelectItem('desc', 'Descending'));

    this.searchFlight = this.searchFlight.bind(this);

    // restore data;
    this.flights = this.sessionService.flights;
    this.searched = this.sessionService.searched;
    this.arrivalFilter = this.sessionService.arrivalFilter;
    this.sortOrder = this.sessionService.sortOrder;
  }

  ngOnInit(): void {

  }

  async searchFlight(page: number): Promise<void> {
    try {
      this.searched = true;
      this.flights = await this.flightService.getFlights(this.arrivalFilter,
          this.PAGE_SIZE,
          (page - 1) * this.PAGE_SIZE, this.sortOrder);

      // save session date for page routing
      this.sessionService.flights = this.flights;
      this.sessionService.searched = true;
      this.sessionService.arrivalFilter = this.arrivalFilter;
      this.sessionService.sortOrder = this.sortOrder;
    } catch (e) {
      console.error(e);
    }
  }

  async viewFlight(flight: Flight) {
    try {
      this.sessionService.selectedFlight = flight;
      await this.router.navigateByUrl('/pages/flightDetails');
    } catch (e) {
      console.error(e);
    }
  }

  async startBooking(flight: Flight) {
    try {
      this.conversationService.beginConversation();
      this.conversationService.conversation.setProperty('selectedFlight',
          flight);
      await this.router.navigateByUrl('/pages/bookingForm');
    } catch (e) {
      console.error(e);
    }
  }
}
