import {
  AfterContentInit, AfterViewInit, ContentChildren, ElementRef,
  QueryList,
} from '@angular/core';
import {FSelectItemComponent} from '../components/f-select-item/f-select-item.component';
import {FSelectItemsComponent} from '../components/f-select-items/f-select-items.component';
import {HFormService} from '../services/h-form.service';
import {MessageService} from '../services/message.service';
import {JsfInput} from './jsf-input';

export abstract class JsfSelectOne extends JsfInput implements AfterContentInit, AfterViewInit {
  @ContentChildren(FSelectItemComponent)
  protected selectItem: QueryList<FSelectItemComponent>;
  @ContentChildren(FSelectItemsComponent)
  protected selectItems: QueryList<FSelectItemsComponent>;

  protected items: Array<FSelectItemComponent> = [];

  constructor(
      formService: HFormService, messageService: MessageService,
      elementRef: ElementRef) {
    super(formService, messageService, elementRef);
  }

  ngAfterContentInit() {
    for (const item of this.selectItem.toArray()) {
      this.items.push(item);
    }
  }

  /**
   * setup f-select items, they are using view children
   * so we have to eval this after view init
   */
  ngAfterViewInit() {
    super.ngAfterViewInit();
    for (const items of this.selectItems.toArray()) {
      for (const item of items.items.toArray()) {
        this.items.push(item);
      }
    }
  }
}