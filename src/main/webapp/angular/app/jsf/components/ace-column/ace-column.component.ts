import {
  Component, ContentChild, ContentChildren, QueryList,
  TemplateRef,
} from '@angular/core';
import {JsfCore} from '../../superclass/jsf-core';
import {FFacetComponent} from '../f-facet/f-facet.component';

@Component({
  selector: 'ace-column',
  templateUrl: './ace-column.component.html',
  styleUrls: ['./ace-column.component.css'],
})
export class AceColumnComponent extends JsfCore {
  @ContentChildren(FFacetComponent)
  facets: QueryList<FFacetComponent>;

  @ContentChild(TemplateRef)
  body: TemplateRef<any>;

  constructor() {
    super();
  }

  get header(): FFacetComponent {
    for (const facet of this.facets.toArray()) {
      if (facet.name === 'header') {
        return facet;
      }
    }
    return null;
  }
}
