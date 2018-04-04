import {
  OnInit, QueryList, TemplateRef, ViewChild,
  ViewChildren,
} from '@angular/core';
import {FFacetComponent} from '../components/f-facet/f-facet.component';

export abstract class AceColumn implements OnInit {
  @ViewChildren(FFacetComponent)
  facets: QueryList<FFacetComponent>;

  @ViewChild(TemplateRef)
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
