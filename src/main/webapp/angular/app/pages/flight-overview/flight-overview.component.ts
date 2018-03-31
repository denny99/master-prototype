import {Component, OnInit} from '@angular/core';
import {SortOrder} from '../../enums/SortOrder';
import ApiSearchResponse from '../../entity/ApiSearchResponse';
import Flight from '../../entity/Flight';
import {FlightService} from '../../services/flight.service';

@Component({
  selector: 'app-flight-overview',
  templateUrl: './flight-overview.component.html',
  styleUrls: ['./flight-overview.component.css'],
})
export class FlightOverviewComponent implements OnInit {
  flights: ApiSearchResponse<Flight>;
  arrivalFilter: string;

  constructor(private flightService: FlightService) {
  }

  async ngOnInit() {
    this.flights = await this.flightService.getFlights('Berlin', 100, 0,
        SortOrder.asc);
  }

}
