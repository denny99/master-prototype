import {Component, Input} from '@angular/core';
import {HFormService} from '../../services/h-form.service';
import JsfElement from '../../superclass/jsf-element';

@Component({
  selector: 'ice-output-link',
  templateUrl: './ice-output-link.component.html',
  styleUrls: ['./ice-output-link.component.css'],
})
export class IceOutputLinkComponent extends JsfElement {
  @Input()
  type: string;

  @Input()
  value: string;

  constructor(hFormService: HFormService) {
    super(hFormService);
  }
}
