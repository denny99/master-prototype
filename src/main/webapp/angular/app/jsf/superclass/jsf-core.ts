import {
  AfterViewInit, ContentChildren, ElementRef, Input, OnInit,
  QueryList,
} from '@angular/core';
import {FEventComponent} from '../components/f-event/f-event.component';
import {IJsfLifecycle} from '../interfaces/jsf-lifecycle';
import ValidationResponse from '../objects/validation-response';

export abstract class JsfCore implements OnInit, AfterViewInit, IJsfLifecycle {
  @Input('id')
  simpleId = '';

  @ContentChildren(FEventComponent)
  events: QueryList<FEventComponent>;
  hasView: boolean;

  constructor(public elementRef: ElementRef) {

  }

  get id() {
    return this.simpleId;
  }

  async jsfOnRender(): Promise<void> {
  }

  /**
   * triggers a specific event
   * @param {string} type
   */
  async triggerEvent(type: string): Promise<ValidationResponse> {
    for (const event of this.events.toArray()) {
      if (event.type === type) {
        return await event.listener(this);
      }
    }
    return new ValidationResponse(false);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.hasView = this.elementRef.nativeElement.offsetParent !== null;
  }
}
