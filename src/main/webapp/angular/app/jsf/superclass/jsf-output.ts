import {Input, OnInit, PipeTransform} from '@angular/core';
import {HFormService} from '../services/h-form.service';
import JsfElement from './jsf-element';

export abstract class JsfOutput extends JsfElement implements OnInit {
  @Input()
  converter: PipeTransform;

  @Input('value')
  protected innerValue: any;

  constructor(hFormService: HFormService) {
    super(hFormService);
  }

  get value(): any {
    if (this.converter) {
      return this.converter.transform(this.innerValue);
    }
    return this.innerValue;
  }

  ngOnInit() {
  }
}
