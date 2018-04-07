import {Component, ContentChildren, Input, QueryList,} from '@angular/core';
import {FFacetComponent} from '../f-facet/f-facet.component';

@Component({
  selector: 'h-panel-grid',
  templateUrl: './h-panel-grid.component.html',
  styleUrls: ['./h-panel-grid.component.css'],
})
export class HPanelGridComponent {
  // has no real usage for now
  @Input()
  columns: number;

  @ContentChildren(FFacetComponent)
  private facets: QueryList<FFacetComponent> = new QueryList<FFacetComponent>();

  constructor() {
  }
}
