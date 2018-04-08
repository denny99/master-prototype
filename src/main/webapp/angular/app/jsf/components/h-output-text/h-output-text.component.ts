import {Component, ElementRef, Input} from '@angular/core';
import {HFormService} from '../../services/h-form.service';
import {JsfOutput} from '../../superclass/jsf-output';

@Component({
  selector: 'h-output-text',
  templateUrl: './h-output-text.component.html',
  styleUrls: ['./h-output-text.component.css'],
})
export class HOutputTextComponent extends JsfOutput {
  @Input()
  type: string;

  constructor(hFormService: HFormService, elementRef: ElementRef) {
    super(hFormService, elementRef);
  }
}
