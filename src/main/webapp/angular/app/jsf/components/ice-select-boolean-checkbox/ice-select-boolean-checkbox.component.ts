import {Component, ElementRef, forwardRef,} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {HFormService} from '../../services/h-form.service';
import {MessageService} from '../../services/message.service';
import JsfElement from '../../superclass/jsf-element';
import {JsfInput} from '../../superclass/jsf-input';
import {HSelectBooleanCheckboxComponent} from '../h-select-boolean-checkbox/h-select-boolean-checkbox.component';

@Component({
  selector: 'ice-select-boolean-checkbox',
  templateUrl: './ice-select-boolean-checkbox.component.html',
  styleUrls: ['./ice-select-boolean-checkbox.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: IceSelectBooleanCheckboxComponent,
      multi: true,
    },
    {
      provide: JsfInput,
      useExisting: forwardRef(() => IceSelectBooleanCheckboxComponent),
    },
    {
      provide: JsfElement,
      useExisting: forwardRef(() => IceSelectBooleanCheckboxComponent),
    },
  ],
})
export class IceSelectBooleanCheckboxComponent extends HSelectBooleanCheckboxComponent {
  constructor(
      hFormService: HFormService, messageService: MessageService,
      elementRef: ElementRef) {
    super(hFormService, messageService, elementRef);
  }
}
