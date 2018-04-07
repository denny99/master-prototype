import {Input} from '@angular/core';
import {HFormService} from '../services/h-form.service';
import {Converter} from './converter';
import JsfElement from './jsf-element';

export abstract class JsfOutput extends JsfElement {
  @Input()
  converter: Converter;

  @Input('value')
  protected innerValue: any;

  constructor(hFormService: HFormService) {
    super(hFormService);
  }

  get value(): any {
    if (this.converter && this.innerValue) {
      return this.converter.transform(this.innerValue);
    }
    return this.innerValue;
  }
}
