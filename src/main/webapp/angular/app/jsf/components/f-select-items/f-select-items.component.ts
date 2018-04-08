import {
  Component, ElementRef, Input, QueryList,
  ViewChildren,
} from '@angular/core';
import {SelectItem} from '../../objects/select-item';
import {JsfCore} from '../../superclass/jsf-core';
import {FSelectItemComponent} from '../f-select-item/f-select-item.component';

@Component({
  selector: 'f-select-items',
  templateUrl: './f-select-items.component.html',
  styleUrls: ['./f-select-items.component.css'],
})
export class FSelectItemsComponent extends JsfCore {
  @Input()
  value: Array<SelectItem>;

  @ViewChildren(FSelectItemComponent)
  items: QueryList<FSelectItemComponent>;

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

}
