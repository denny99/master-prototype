import {
  AfterViewInit, Component, ContentChildren, forwardRef, Input, OnInit,
  QueryList, ViewChild,
} from '@angular/core';
import {NG_VALUE_ACCESSOR, NgModel} from '@angular/forms';
import {HFormService} from '../../services/h-form.service';
import {MessageService} from '../../services/message.service';
import {JsfInput} from '../../superclass/jsf-input';
import {FSelectItemComponent} from '../f-select-item/f-select-item.component';
import {FSelectItemsComponent} from '../f-select-items/f-select-items.component';

@Component({
  selector: 'h-select-one-menu',
  templateUrl: './h-select-one-menu.component.html',
  styleUrls: ['./h-select-one-menu.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: HSelectOneMenuComponent,
      multi: true,
    },
    {
      provide: JsfInput,
      useExisting: forwardRef(() => HSelectOneMenuComponent),
    },
  ],
})
export class HSelectOneMenuComponent extends JsfInput implements OnInit, AfterViewInit {
  @Input()
  size: number;

  @ViewChild(NgModel) model: NgModel;

  @ContentChildren(FSelectItemComponent)
  private selectItem: QueryList<FSelectItemComponent> = new QueryList<FSelectItemComponent>();
  @ContentChildren(FSelectItemsComponent)
  private selectItems: QueryList<FSelectItemsComponent> = new QueryList<FSelectItemsComponent>();

  private items: Array<FSelectItemComponent> = [];

  constructor(messageService: MessageService, formService: HFormService) {
    super(formService, messageService);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    for (const item of this.selectItem.toArray()) {
      this.items.push(item);
    }

    for (const items of this.selectItems.toArray()) {
      for (const item of items.items.toArray()) {
        this.items.push(item);
      }
    }
  }

}
