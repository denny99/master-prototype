import {Component, forwardRef, OnInit} from '@angular/core';
import {AceColumn} from '../../../jsf/superclass/ace-column';

@Component({
  selector: 'app-flight-column-1',
  templateUrl: './flight-column-1.component.html',
  styleUrls: ['./flight-column-1.component.css'],
  providers: [
    {
      provide: AceColumn,
      useExisting: forwardRef(() => FlightColumn1Component),
    }],
})
export class FlightColumn1Component extends AceColumn implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {
  }

}
