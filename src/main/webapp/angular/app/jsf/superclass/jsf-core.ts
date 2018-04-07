import {ContentChildren, Input, OnInit, QueryList} from '@angular/core';
import {FEventComponent} from '../components/f-event/f-event.component';
import {IJsfLifecycle} from '../interfaces/jsf-lifecycle';

export abstract class JsfCore implements OnInit, IJsfLifecycle {
  @Input('id')
  simpleId = '';

  @ContentChildren(FEventComponent)
  events: QueryList<FEventComponent> = new QueryList<FEventComponent>();

  get id() {
    return this.simpleId;
  }

  async jsfOnRender(): Promise<void> {
  }

  /**
   * triggers a specific event
   * @param {string} type
   */
  triggerEvent(type: string): void {
    for (const event of this.events.toArray()) {
      if (event.type === type) {
        event.listener.emit(this);
      }
    }
  }

  ngOnInit() {
  }
}
