import {ControlValueAccessor, NgModel} from '@angular/forms';
import JsfElement from './jsf-element';
import {HFormService} from '../services/h-form.service';
import {MessageService} from '../services/message.service';
import {ContentChildren, Input, QueryList} from '@angular/core';
import {FValidateRegexComponent} from '../components/f-validate-regex/f-validate-regex.component';
import {isEmpty} from 'lodash';

export abstract class JsfInput extends JsfElement implements ControlValueAccessor {
  @Input()
  validatorMessage: string;

  @Input()
  requiredMessage: string;

  @Input()
  required: boolean;

  protected abstract model: NgModel;

  @ContentChildren(FValidateRegexComponent)
  private regexValidators: QueryList<FValidateRegexComponent>;
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
    let valid = true;
    let message = '';
    this.regexValidators.forEach((validator) => {
      if (!validator.validate(this.value)) {
        valid = false;
        message = this.validatorMessage;
      }
    });

    if (isEmpty(this.value) && this.required) {
      valid = false;
      message = this.requiredMessage;
    }

    this.messageService.submitError(this.simpleId, !valid, message);
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
