import {
  Component, ContentChild, ContentChildren, OnInit, QueryList,
  TemplateRef,
} from '@angular/core';
import {FFacetComponent} from '../f-facet/f-facet.component';

@Component({
  selector: 'ace-column',
  templateUrl: './ace-column.component.html',
  styleUrls: ['./ace-column.component.css'],
})
export class AceColumnComponent implements OnInit {
  @ContentChildren(FFacetComponent)
  facets: QueryList<FFacetComponent>;

  @ContentChild(TemplateRef)
  body: TemplateRef<any>;

  constructor() {
  }

  get header(): FFacetComponent {
    let result: FFacetComponent = null;
    this.facets.forEach((facet) => {
      if (facet.name === 'header') {
        result = facet;
      }
    });
    return result;
  }

  ngOnInit() {
  }
}
