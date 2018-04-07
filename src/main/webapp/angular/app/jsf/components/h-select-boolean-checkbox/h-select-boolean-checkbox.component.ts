import {Component, forwardRef, ViewChild} from '@angular/core';
import {NG_VALUE_ACCESSOR, NgModel} from '@angular/forms';
import {HFormService} from '../../services/h-form.service';
import {MessageService} from '../../services/message.service';
import JsfElement from '../../superclass/jsf-element';
import {JsfInput} from '../../superclass/jsf-input';

@Component({
  selector: 'h-select-boolean-checkbox',
  templateUrl: './h-select-boolean-checkbox.component.html',
  styleUrls: ['./h-select-boolean-checkbox.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: HSelectBooleanCheckboxComponent,
      multi: true,
    },
    {
      provide: JsfInput,
      useExisting: forwardRef(() => HSelectBooleanCheckboxComponent),
    },
    {
      provide: JsfElement,
      useExisting: forwardRef(() => HSelectBooleanCheckboxComponent),
    },
  ],
})
export class HSelectBooleanCheckboxComponent extends JsfInput {
  @ViewChild(NgModel) model: NgModel;

  constructor(hFormService: HFormService, messageService: MessageService) {
    super(hFormService, messageService);
  }
}
