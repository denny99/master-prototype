import {
  AfterViewInit, Component, ContentChildren, ElementRef, Input, OnChanges,
  OnInit, QueryList, ViewChild,
} from '@angular/core';
import {HFormService} from '../../services/h-form.service';
import JsfElement from '../../superclass/jsf-element';
import {FFacetComponent} from '../f-facet/f-facet.component';

@Component({
  selector: 'ice-panel-popup',
  templateUrl: './ice-panel-popup.component.html',
  styleUrls: ['./ice-panel-popup.component.css'],
})
export class IcePanelPopupComponent extends JsfElement implements OnInit, AfterViewInit, OnChanges {
  @Input()
  visible: boolean;
  @Input()
  draggable: boolean;
  @Input()
  autoCentre: boolean;

  @ViewChild('popup')
  popup: ElementRef;

  private height: number;
  private width: number;

  @ContentChildren(FFacetComponent)
  private facets: QueryList<FFacetComponent>;

  constructor(hFormService: HFormService, elementRef: ElementRef) {
    super(hFormService, elementRef);
  }

  get body(): FFacetComponent {
    for (const facet of this.facets.toArray()) {
      if (facet.name === 'body') {
        return facet;
      }
    }
    return null;
  }

  ngOnInit() {
    this.style = {
      position: 'absolute',
      display: 'none',
    };
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
  }

  ngOnChanges() {
    const self = this;

    // we have to use timeout here, as an update in view init is not allowed
    // and we have to manipulate the position after we know the dimensions of the div
    setTimeout(() => {
      // first show the element so the browser calc its height and width
      self.style.display = self.visible ? 'block' : 'none';
      setTimeout(() => {
        // now the element is visible and we can set its position
        self.width = self.popup.nativeElement.offsetWidth;
        self.height = self.popup.nativeElement.offsetHeight;
        self.style.left = `${self.width ?
            window.innerWidth / 2 - (self.width / 2) :
            0}px`;
        self.style.top = `${self.height ?
            window.innerHeight / 2 - (self.height / 2) :
            0}px`;
      });
    }, 0);
  }
}
