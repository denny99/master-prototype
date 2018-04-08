import {Component, ElementRef, Input} from '@angular/core';
import {HFormService} from '../../services/h-form.service';
import JsfElement from '../../superclass/jsf-element';

@Component({
  selector: 'h-panel-group',
  templateUrl: './h-panel-group.component.html',
  styleUrls: ['./h-panel-group.component.css'],
})
export class HPanelGroupComponent extends JsfElement {
  @Input()
  layout: string;

  constructor(hFormService: HFormService, elementRef: ElementRef) {
    super(hFormService, elementRef);
  }
}
