import {ControlValueAccessor, NgModel} from '@angular/forms';
import JsfElement from './jsf-element';
import {HFormService} from '../services/h-form.service';
import {MessageService} from '../services/message.service';
import {Input} from '@angular/core';

export abstract class JsfInput extends JsfElement implements ControlValueAccessor {
  @Input()
  validatorMessage: string;

  protected abstract model: NgModel;
  private innerValue: any;

  private changeListener = [];
  private touchListener = [];

  constructor(
      hFromService: HFormService, private messageService: MessageService) {
    super(hFromService);
  }

  get value(): any {
    return this.innerValue;
  }

  set value(value: any) {
    if (this.innerValue !== value) {
      this.innerValue = value;
      this.changeListener.forEach(f => f(this.innerValue));
    }
  }

  validate() {
    this.messageService.submitError(this.simpleId, true, this.validatorMessage);
  }

  touch() {
    this.touchListener.forEach(f => f());
  }

  writeValue(value: any) {
    this.innerValue = value;
  }

  registerOnChange(fn: (value: any) => void) {
    this.changeListener.push(fn);
  }

  registerOnTouched(fn: () => void) {
    this.touchListener.push(fn);
  }
}
