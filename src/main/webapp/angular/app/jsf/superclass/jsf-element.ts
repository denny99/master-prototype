import {Input, OnInit} from '@angular/core';
import {HFormService} from '../services/h-form.service';

export default abstract class JsfElement implements OnInit {
  @Input()
  styleClass: string;

  @Input()
  style: string;

  @Input('id')
  simpleId: string;

  constructor(private hFormService: HFormService) {
  }

  get id() {
    if (this.hFormService.formId) {
      return `${this.hFormService.formId}:${this.simpleId}`;
    }
    return this.simpleId;
  }

  ngOnInit() {
  }
}
