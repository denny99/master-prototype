import {ContentChildren, Input, QueryList} from '@angular/core';
import {FAjaxComponent} from '../components/f-ajax/f-ajax.component';
import {HFormService} from '../services/h-form.service';
import {JsfCore} from './jsf-core';

export default abstract class JsfElement extends JsfCore {
  @Input()
  styleClass = '';

  @Input()
  style: CSSStyleDeclaration;

  @Input()
  rendered = true;

  @ContentChildren(FAjaxComponent)
  protected ajax: QueryList<FAjaxComponent>;

  constructor(protected hFormService: HFormService) {
    super();
  }

  get id(): string {
    return this.hFormService.getFormId(this.simpleId);
  }

  /**
   *
   * add more events if required
   * don't forget to use them in the actual .html File
   *
   */
  callAjax(event: string): void {
    for (const ajax of this.ajax.toArray()) {
      if (ajax.event === event) {
        ajax.call(this);
      }
    }
  }

  async onClick(): Promise<void> {
    this.callAjax('click');
  }
}
