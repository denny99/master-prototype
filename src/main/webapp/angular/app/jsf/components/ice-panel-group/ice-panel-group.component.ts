import {
  Component, ContentChildren, ElementRef, Input,
  QueryList,
} from '@angular/core';
import {HFormService} from '../../services/h-form.service';
import {FFacetComponent} from '../f-facet/f-facet.component';
import {HPanelGroupComponent} from '../h-panel-group/h-panel-group.component';

@Component({
  selector: 'ice-panel-group',
  templateUrl: './ice-panel-group.component.html',
  styleUrls: ['./ice-panel-group.component.css'],
})
export class IcePanelGroupComponent extends HPanelGroupComponent {
  @Input()
  panelTooltip: string;

  @ContentChildren(FFacetComponent)
  private facets: QueryList<FFacetComponent>;

  constructor(hFormService: HFormService, elementRef: ElementRef) {
    super(hFormService, elementRef);
  }

  get tooltip(): FFacetComponent {
    for (const facet of this.facets.toArray()) {
      if (facet.name === 'tooltip') {
        return facet;
      }
    }
    return null;

  }
}
