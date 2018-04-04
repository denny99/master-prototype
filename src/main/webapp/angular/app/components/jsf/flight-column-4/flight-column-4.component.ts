import {Component, OnInit} from '@angular/core';
import {AceColumn} from '../../../jsf/superclass/ace-column';
import Flight from '../../../entity/Flight';

@Component({
  selector: 'app-flight-column-4',
  templateUrl: './flight-column-4.component.html',
  styleUrls: ['./flight-column-4.component.css'],
})
export class FlightColumn4Component extends AceColumn implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {
  }

  viewFlight(flight: Flight): void {

  }

  startBooking(flight: Flight): void {

  }

}
