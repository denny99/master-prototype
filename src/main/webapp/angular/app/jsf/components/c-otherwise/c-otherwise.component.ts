import {Component, TemplateRef, ViewChild} from '@angular/core';
import {JsfCore} from '../../superclass/jsf-core';

@Component({
  selector: 'c-otherwise',
  templateUrl: './c-otherwise.component.html',
  styleUrls: ['./c-otherwise.component.css'],
})
export class COtherwiseComponent extends JsfCore {
  @ViewChild(TemplateRef)
  content: TemplateRef<any>;

  constructor() {
    super();
  }
}
