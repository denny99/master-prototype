import {Component, EventEmitter, Input, Output} from '@angular/core';
import {JsfCore} from '../../superclass/jsf-core';

@Component({
  selector: 'f-event',
  templateUrl: './f-event.component.html',
  styleUrls: ['./f-event.component.css'],
})
export class FEventComponent {
  @Input()
  id: string;
  @Input()
  type: string;
  @Output()
  listener = new EventEmitter<JsfCore>();

  constructor() {
  }
}
