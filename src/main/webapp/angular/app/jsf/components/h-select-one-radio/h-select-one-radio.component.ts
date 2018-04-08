import {
  AfterContentInit, AfterViewInit, Component, ElementRef, forwardRef,
  Input,
} from '@angular/core';
import {NG_VALUE_ACCESSOR, NgModel} from '@angular/forms';
import {HFormService} from '../../services/h-form.service';
import {MessageService} from '../../services/message.service';
import JsfElement from '../../superclass/jsf-element';
import {JsfInput} from '../../superclass/jsf-input';
import {JsfSelectOne} from '../../superclass/jsf-select-one';

@Component({
  selector: 'h-select-one-radio',
  templateUrl: './h-select-one-radio.component.html',
  styleUrls: ['./h-select-one-radio.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: HSelectOneRadioComponent,
      multi: true,
    },
    {
      provide: JsfInput,
      useExisting: forwardRef(() => HSelectOneRadioComponent),
    },
    {
      provide: JsfElement,
      useExisting: forwardRef(() => HSelectOneRadioComponent),
    },
  ],
})
export class HSelectOneRadioComponent extends JsfSelectOne implements AfterContentInit, AfterViewInit {
  @Input()
  layout: string;

  model: NgModel;

  constructor(
      messageService: MessageService, formService: HFormService,
      elementRef: ElementRef) {
    super(formService, messageService, elementRef);

    this.radioCallback = this.radioCallback.bind(this);
    this.getCurrentValue = this.getCurrentValue.bind(this);
  }

  getCurrentValue() {
    return this.innerValue;
  }

  radioCallback(event: any) {
    this.value = event.target.value;
  }

  ngAfterContentInit() {
    super.ngAfterContentInit();
    for (const item of this.items) {
      item.currentValue = this.getCurrentValue;
      item.radioCallback = this.radioCallback;
    }
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    for (const item of this.items) {
      item.currentValue = this.getCurrentValue;
      item.radioCallback = this.radioCallback;
    }
  }
}
