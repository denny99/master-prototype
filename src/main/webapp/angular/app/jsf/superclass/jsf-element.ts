import {Input, OnInit} from '@angular/core';
import {HFormService} from '../services/h-form.service';

export default abstract class JsfElement implements OnInit {
  @Input()
  styleClass: string;

  @Input()
  style: object;

  @Input('id')
  simpleId: string;

  @Input()
  rendered = true;

  constructor(protected hFormService: HFormService) {
  }

  get id(): string {
    return this.hFormService.getFormId(this.simpleId);
  }

  ngOnInit() {
  }
}