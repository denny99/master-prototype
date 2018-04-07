import {Component, Input} from '@angular/core';
import {LongDatePipe} from '../../../converter/long-date-pipe';
import Flight from '../../../entity/Flight';

@Component({
  selector: 'cc-flight-details',
  templateUrl: './cc-flight-details.component.html',
  styleUrls: ['./cc-flight-details.component.css'],
})
export class CCFlightDetailsComponent {
  @Input()
  flight: Flight;

  @Input()
  headline: boolean;

  @Input()
  standalone: boolean;

  private dateConverter = new LongDatePipe('de-DE');

  constructor() {
  }
}
