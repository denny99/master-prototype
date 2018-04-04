import {Component, OnInit} from '@angular/core';
import {AceColumn} from '../../../jsf/superclass/ace-column';

@Component({
  selector: 'app-flight-column-3',
  templateUrl: './flight-column-3.component.html',
  styleUrls: ['./flight-column-3.component.css'],
})
export class FlightColumn3Component extends AceColumn implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {
  }

}
