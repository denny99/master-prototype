import {AfterViewInit, ContentChild, ElementRef, Input} from '@angular/core';
import {FConvertNumberComponent} from '../components/f-convert-number/f-convert-number.component';
import {HFormService} from '../services/h-form.service';
import {Converter} from './converter';
import JsfElement from './jsf-element';

export abstract class JsfOutput extends JsfElement implements AfterViewInit {
  @Input()
  converter: Converter;

  @Input('value')
  protected innerValue: any;

  @ContentChild(FConvertNumberComponent)
  convertNumber: FConvertNumberComponent;

  constructor(hFormService: HFormService, elementRef: ElementRef) {
    super(hFormService, elementRef);
  }

  get value(): any {
    if (this.converter && this.innerValue) {
      return this.converter.transform(this.innerValue);
    }
    return this.innerValue;
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();

    // apply child as converter
    if (this.convertNumber) {
      this.converter = this.convertNumber;
    }
  }
}
