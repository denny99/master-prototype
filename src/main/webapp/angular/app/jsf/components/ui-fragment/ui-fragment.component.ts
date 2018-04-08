import {Component, ElementRef, Input} from '@angular/core';
import {JsfCore} from '../../superclass/jsf-core';

@Component({
  selector: 'ui-fragment',
  templateUrl: './ui-fragment.component.html',
  styleUrls: ['./ui-fragment.component.css'],
})
export class UiFragmentComponent extends JsfCore {
  @Input()
  rendered: boolean;

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

}
