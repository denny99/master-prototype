import {
  ContentChildren, EventEmitter, Input, Output,
  QueryList,
} from '@angular/core';
import {ControlValueAccessor, NgModel} from '@angular/forms';
import {isEmpty} from 'lodash';
import {FAjaxComponent} from '../components/f-ajax/f-ajax.component';
import {FValidateRegexComponent} from '../components/f-validate-regex/f-validate-regex.component';
import ValidationResponse from '../objects/validation-response';
import {HFormService} from '../services/h-form.service';
import {MessageService} from '../services/message.service';
import {JsfOutput} from './jsf-output';

export abstract class JsfInput extends JsfOutput implements ControlValueAccessor {
  @Input()
  validatorMessage: string;

  @Input()
  converterMessage: string;

  @Input()
  requiredMessage: string;

  @Input()
  required: boolean;

  @Input()
  validator: (elem: JsfInput) => Promise<ValidationResponse>;

  @Output()
  onchange = new EventEmitter<any>();

  protected abstract model: NgModel;

  @ContentChildren(FValidateRegexComponent)
  private regexValidators: QueryList<FValidateRegexComponent>;

  @ContentChildren(FAjaxComponent)
  private ajax: QueryList<FAjaxComponent>;

  private changeListener = [];
  private touchListener = [];
  private converterError = false;

  constructor(
      hFromService: HFormService, private messageService: MessageService) {
    super(hFromService);
  }

  // same as in JsfOutput but for some reason angular won't use the getter
  get value(): any {
    if (this.converter && this.innerValue) {
      return this.converter.transform(this.innerValue);
    }
    return this.innerValue;
  }

  set value(value: any) {
    if (this.innerValue !== value) {
      // converter given? then convert
      if (this.converter) {
        try {
          this.innerValue = this.converter.transformToObject(value);
          this.converterError = false;
        } catch (e) {
          // we have to save the value anyway, otherwise the input of the user is deleted
          this.innerValue = value;
          this.converterError = true;
        }
      } else {
        this.innerValue = value;
      }
      this.changeListener.forEach(f => f(this.innerValue));
    }
  }

  /**
   *
   * add more events if required
   * don't forget to use them in the actual .html File
   *
   */
  async callAjax(event: string): Promise<void> {
    const valid = await this.validate();

    for (const ajax of this.ajax.toArray()) {
      if (ajax.event === event) {
        // if input is invalid and ajax is not set to immediate exec
        // prevent call
        if (valid || ajax.immediate) {
          ajax.call();
        }
      }
    }
  }

  async onBlur() {
    try {
      await this.validate();
      await this.callAjax('blur');
    } catch (e) {
      console.error(e);
    }
  }

  async onChange() {
    this.onchange.emit(this.innerValue);
    try {
      await this.callAjax('change');
    } catch (e) {
      console.error(e);
    }
  }

  /**
   *
   * @returns {Promise<boolean>} true when input ok
   */
  async validate(): Promise<boolean> {
    let valid = true;
    let message = '';

    // check for converter error
    if (this.converterError) {
      valid = false;
      message = this.converterMessage;
    }

    // check for regex validators
    for (const validator of this.regexValidators.toArray()) {
      if (!validator.validate(this.innerValue)) {
        valid = false;
        message = this.validatorMessage;
      }
    }

    // check for required
    if (isEmpty(this.innerValue) && this.required && valid) {
      valid = false;
      message = this.requiredMessage;
    }

    // check for additional custom validators
    if (valid && this.validator) {
      const result = await this.validator(this);
      if (result.error) {
        valid = false;
        message = result.message;
      }
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
