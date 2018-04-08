import {Component, ElementRef, Input} from '@angular/core';
import {HFormService} from '../../services/h-form.service';
import {JsfOutput} from '../../superclass/jsf-output';

@Component({
  selector: 'h-output-label',
  templateUrl: './h-output-label.component.html',
  styleUrls: ['./h-output-label.component.css'],
})
export class HOutputLabelComponent extends JsfOutput {
  @Input('for')
  forId: string;

  constructor(hFormService: HFormService, elementRef: ElementRef) {
    super(hFormService, elementRef);
  }
}
