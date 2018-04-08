import {
  Component, ContentChildren, ElementRef, Input,
  QueryList,
} from '@angular/core';
import {HFormService} from '../../services/h-form.service';
import JsfElement from '../../superclass/jsf-element';
import {FFacetComponent} from '../f-facet/f-facet.component';

@Component({
  selector: 'h-panel-grid',
  templateUrl: './h-panel-grid.component.html',
  styleUrls: ['./h-panel-grid.component.css'],
})
export class HPanelGridComponent extends JsfElement {
  // has no real usage for now
  @Input()
  columns: number;

  @ContentChildren(FFacetComponent)
  private facets: QueryList<FFacetComponent>;

  constructor(hFormService: HFormService, elementRef: ElementRef) {
    super(hFormService, elementRef);
  }
}
