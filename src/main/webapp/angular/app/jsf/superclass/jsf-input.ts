import {
  ContentChildren, EventEmitter, Input, Output,
  QueryList,
} from '@angular/core';
import {ControlValueAccessor, NgModel} from '@angular/forms';
import {isEmpty} from 'lodash';
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
  disabled: boolean;

  @Input()
  maxLength: number;

  @Input()
  validator: (elem: JsfInput) => Promise<ValidationResponse>;

  @Output()
  onchange = new EventEmitter<any>();

  protected abstract model: NgModel;

  @ContentChildren(FValidateRegexComponent)
  private regexValidators: QueryList<FValidateRegexComponent>;

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

  async jsfOnRender(): Promise<void> {
    try {
      await super.jsfOnRender();
      await this.validate();
    } catch (e) {
      console.error(e);
    }
  }

  /**
   *
   * add more events if required
   * don't forget to use them in the actual .html File
   *
   */
  async callAjax(event: string): Promise<void> {
    for (const ajax of this.ajax.toArray()) {
      if (ajax.event === event) {
        // if input is invalid and ajax is not set to immediate exec
        // prevent call
        let valid = true;
        if (!ajax.immediate) {
          valid = await this.validate();
        }

        if (valid) {
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

    if (valid && this.maxLength && typeof this.innerValue === 'string' &&
        this.innerValue.length > this.maxLength) {
      valid = false;
      message = `Input is too long. Maximum ${this.maxLength} characters allowed`;
    }

    this.messageService.submitError(this.simpleId, !valid, message);

    this.triggerEvent('postValidate');

    return valid;
  }

  /**
   * ng specific input functions
   */
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
