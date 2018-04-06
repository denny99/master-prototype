import {ControlValueAccessor, NgModel} from '@angular/forms';
import {HFormService} from '../services/h-form.service';
import {MessageService} from '../services/message.service';
import {ContentChildren, Input, QueryList} from '@angular/core';
import {FValidateRegexComponent} from '../components/f-validate-regex/f-validate-regex.component';
import {isEmpty} from 'lodash';
import {JsfOutput} from './jsf-output';

export abstract class JsfInput extends JsfOutput implements ControlValueAccessor {
  @Input()
  validatorMessage: string;

  @Input()
  requiredMessage: string;

  @Input()
  required: boolean;

  protected abstract model: NgModel;

  @ContentChildren(FValidateRegexComponent)
  private regexValidators: QueryList<FValidateRegexComponent>;

  private changeListener = [];
  private touchListener = [];

  constructor(
      hFromService: HFormService, private messageService: MessageService) {
    super(hFromService);
  }

  // same as in JsfOutput but for some reason angular won't use the getter
  get value(): any {
    if (this.converter) {
      return this.converter.transform(this.innerValue);
    }
    return this.innerValue;
  }

  set value(value: any) {
    if (this.innerValue !== value) {
      this.innerValue = value;
      this.changeListener.forEach(f => f(this.innerValue));
    }
  }

  validate(): boolean {
    let valid = true;
    let message = '';
    this.regexValidators.forEach((validator) => {
      if (!validator.validate(this.innerValue)) {
        valid = false;
        message = this.validatorMessage;
      }
    });

    if (isEmpty(this.innerValue) && this.required) {
      valid = false;
      message = this.requiredMessage;
    }

    this.messageService.submitError(this.simpleId, !valid, message);
    return valid;
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
