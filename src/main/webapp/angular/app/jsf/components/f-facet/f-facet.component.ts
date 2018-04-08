import {
  Component, ElementRef, Input, TemplateRef,
  ViewChild,
} from '@angular/core';
import {JsfCore} from '../../superclass/jsf-core';

@Component({
  selector: 'f-facet',
  templateUrl: './f-facet.component.html',
  styleUrls: ['./f-facet.component.css'],
})
export class FFacetComponent extends JsfCore {
  @Input()
  name: string;

  @ViewChild(TemplateRef)
  content: TemplateRef<any>;

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

}
