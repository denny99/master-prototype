import {Component, OnInit} from '@angular/core';
import ApiSearchResponse from '../../../entity/ApiSearchResponse';
import Flight from '../../../entity/Flight';
import {FlightService} from '../../../services/flight.service';
import {SelectItem} from '../../../jsf/objects/select-item';
import {LongDatePipe} from '../../converter/LongDatePipe';

@Component({
  selector: 'app-flight-overview',
  templateUrl: './flight-overview.component.html',
  styleUrls: ['./flight-overview.component.css'],
})
export class FlightOverviewComponent implements OnInit {
  private PAGE_SIZE = 10;
  private flights: ApiSearchResponse<Flight> = new ApiSearchResponse<Flight>();
  private arrivalFilter = '';
  private sortOrder = '';
  private sortOptions: Array<SelectItem> = [];
  private searched = false;
  private dateConverter = new LongDatePipe('de-DE');

  constructor(private flightService: FlightService) {
    this.sortOptions.push(new SelectItem('asc', 'Ascending'));
    this.sortOptions.push(new SelectItem('desc', 'Descending'));

    this.searchFlight = this.searchFlight.bind(this);
  }

  ngOnInit(): void {

  }

  async searchFlight(page: number): Promise<void> {
    this.searched = true;
    this.flights = await this.flightService.getFlights(this.arrivalFilter,
        this.PAGE_SIZE,
        (page - 1) * this.PAGE_SIZE, this.sortOrder);
  }

  viewFlight(flight: Flight) {

  }

  startBooking(flight: Flight) {

  }
}
