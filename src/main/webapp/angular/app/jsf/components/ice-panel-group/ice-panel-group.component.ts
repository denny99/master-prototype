import {
  Component, ContentChildren, Input, OnInit,
  QueryList,
} from '@angular/core';
import {HFormService} from '../../services/h-form.service';
import JsfElement from '../../superclass/jsf-element';
import {FFacetComponent} from '../f-facet/f-facet.component';

@Component({
  selector: 'ice-panel-group',
  templateUrl: './ice-panel-group.component.html',
  styleUrls: ['./ice-panel-group.component.css'],
})
export class IcePanelGroupComponent extends JsfElement implements OnInit {
  @Input()
  panelTooltip: string;

  @ContentChildren(FFacetComponent)
  private facets: QueryList<FFacetComponent> = new QueryList<FFacetComponent>();

  constructor(hFormService: HFormService) {
    super(hFormService);
  }

  get tooltip(): FFacetComponent | object {
    let resultFacet: FFacetComponent | object = {};
    this.facets.forEach((facet) => {
      if (facet.name === 'tooltip') {
        resultFacet = facet;
      }
    });
    return resultFacet;

  }

  ngOnInit() {
  }
}
