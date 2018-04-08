import {
  Component, ElementRef, Input, TemplateRef,
  ViewChild,
} from '@angular/core';
import {JsfCore} from '../../superclass/jsf-core';

@Component({
  selector: 'c-when',
  templateUrl: './c-when.component.html',
  styleUrls: ['./c-when.component.css'],
})
export class CWhenComponent extends JsfCore {
  @Input()
  test: boolean;

  @ViewChild(TemplateRef)
  content: TemplateRef<any>;

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }
}
