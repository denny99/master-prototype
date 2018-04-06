import {Component, Input, OnInit} from '@angular/core';
import Flight from '../../../entity/Flight';
import {LongDatePipe} from '../../converter/LongDatePipe';

@Component({
  selector: 'cc-flight-details',
  templateUrl: './cc-flight-details.component.html',
  styleUrls: ['./cc-flight-details.component.css'],
})
export class CCFlightDetailsComponent implements OnInit {
  @Input()
  flight: Flight;

  @Input()
  headline: boolean;

  @Input()
  standalone: boolean;

  private dateConverter = new LongDatePipe('de-DE');

  constructor() {
  }

  ngOnInit() {
  }

}
