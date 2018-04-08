import {
  Component, ElementRef, forwardRef, Input,
  ViewChild,
} from '@angular/core';
import {NG_VALUE_ACCESSOR, NgModel} from '@angular/forms';
import {HFormService} from '../../services/h-form.service';
import {MessageService} from '../../services/message.service';
import JsfElement from '../../superclass/jsf-element';
import {JsfInput} from '../../superclass/jsf-input';
import {JsfSelectOne} from '../../superclass/jsf-select-one';

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
    {
      provide: JsfElement,
      useExisting: forwardRef(() => HSelectOneMenuComponent),
    },
  ],
})
export class HSelectOneMenuComponent extends JsfSelectOne {
  @Input()
  size: number;

  @ViewChild(NgModel) model: NgModel;

  constructor(
      messageService: MessageService, formService: HFormService,
      elementRef: ElementRef) {
    super(formService, messageService, elementRef);
  }

}
