import {Component, forwardRef, ViewChild} from '@angular/core';
import {NG_VALUE_ACCESSOR, NgModel} from '@angular/forms';
import {HFormService} from '../../services/h-form.service';
import {MessageService} from '../../services/message.service';
import JsfElement from '../../superclass/jsf-element';
import {JsfInput} from '../../superclass/jsf-input';

@Component({
  selector: 'h-input-hidden',
  templateUrl: './h-input-hidden.component.html',
  styleUrls: ['./h-input-hidden.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: HInputHiddenComponent,
      multi: true,
    },
    {
      provide: JsfInput,
      useExisting: forwardRef(() => HInputHiddenComponent),
    },
    {
      provide: JsfElement,
      useExisting: forwardRef(() => HInputHiddenComponent),
    },
  ],
})
export class HInputHiddenComponent extends JsfInput {
  @ViewChild(NgModel) model: NgModel;

  constructor(hFormService: HFormService, messageService: MessageService) {
    super(hFormService, messageService);
  }
}

