import {
  AfterViewInit, Component, ContentChildren, Input, OnInit, QueryList,
  ViewChild,
} from '@angular/core';
import {JsfInput} from '../../superclass/input';
import {MessageService} from '../../services/message.service';
import {HFormService} from '../../services/h-form.service';
import {FSelectItemComponent} from '../f-select-item/f-select-item.component';
import {NG_VALUE_ACCESSOR, NgModel} from '@angular/forms';
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
    this.selectItem.forEach((item) => {
      this.items.push(item);
    });

    this.selectItems.forEach((items) => {
      items.items.forEach((item => {
        this.items.push(item);
      }));
    });
  }

}
