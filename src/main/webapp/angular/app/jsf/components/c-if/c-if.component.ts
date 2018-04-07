import {Component, Input} from '@angular/core';
import {JsfCore} from '../../superclass/jsf-core';

@Component({
  selector: 'c-if',
  templateUrl: './c-if.component.html',
  styleUrls: ['./c-if.component.css'],
})
export class CIfComponent extends JsfCore {
  @Input()
  test: boolean;

  constructor() {
    super();
  }
}
