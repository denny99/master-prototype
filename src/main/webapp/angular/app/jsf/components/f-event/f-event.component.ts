import {Component, Input} from '@angular/core';
import ValidationResponse from '../../objects/validation-response';
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
  @Input()
  listener: (elem: JsfCore) => Promise<ValidationResponse>;

  constructor() {
  }
}
