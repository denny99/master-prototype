import {Component, forwardRef, OnInit} from '@angular/core';
import {AceColumn} from '../../../jsf/superclass/ace-column';

@Component({
  selector: 'app-flight-column-2',
  templateUrl: './flight-column-2.component.html',
  styleUrls: ['./flight-column-2.component.css'],
  providers: [
    {
      provide: AceColumn,
      useExisting: forwardRef(() => FlightColumn2Component),
    }],
})
export class FlightColumn2Component extends AceColumn implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {
  }

}
