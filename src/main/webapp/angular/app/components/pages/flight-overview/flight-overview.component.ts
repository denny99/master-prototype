import {Component, OnInit} from '@angular/core';
import {SortOrder} from '../../../enums/SortOrder';
import ApiSearchResponse from '../../../entity/ApiSearchResponse';
import Flight from '../../../entity/Flight';
import {FlightService} from '../../../services/flight.service';
import {SelectItem} from '../../../jsf/objects/select-item';

@Component({
  selector: 'app-flight-overview',
  templateUrl: './flight-overview.component.html',
  styleUrls: ['./flight-overview.component.css'],
})
export class FlightOverviewComponent implements OnInit {
  private flights: ApiSearchResponse<Flight> = new ApiSearchResponse<Flight>();
  private arrivalFilter: string;
  private sortOrder = '';
  private sortOptions: Array<SelectItem> = [];
  private searched = true;

  constructor(private flightService: FlightService) {
    this.sortOptions.push(new SelectItem('asc', 'Ascending'));
    this.sortOptions.push(new SelectItem('desc', 'Descending'));

    this.searchFlight = this.searchFlight.bind(this);
  }

  ngOnInit(): void {

  }

  async searchFlight(): Promise<void> {
    this.searched = true;
    this.flights = await this.flightService.getFlights('', 10, 0,
        SortOrder.asc);
  }
}
