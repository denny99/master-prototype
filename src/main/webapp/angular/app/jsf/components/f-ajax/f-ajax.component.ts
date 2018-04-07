import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IAjaxEventParameter} from '../../interfaces/ajax-event-parameter';
import {HFormService} from '../../services/h-form.service';
import {JsfService} from '../../services/jsf.service';
import {JsfCore} from '../../superclass/jsf-core';

@Component({
  selector: 'f-ajax',
  templateUrl: './f-ajax.component.html',
  styleUrls: ['./f-ajax.component.css'],
})
export class FAjaxComponent extends JsfCore {
  @Input()
  event: string;
  @Input()
  execute: string;
  // just for compatibility purposes, angular renders what is has to render anyway
  @Input()
  render: string;
  @Input()
  immediate = false;

  @Output()
  listener = new EventEmitter<IAjaxEventParameter>();

  this: object;

  constructor(
      private hFormService: HFormService, private jsfService: JsfService) {
    super();
  }

  /**
   * trigger ajax call
   */
  call() {
    let execElem: JsfCore;
    let renderElem: JsfCore;
    switch (this.execute) {
      case '@all':
        execElem = this.jsfService.all;
        break;
      case '@form':
        execElem = this.hFormService.form;
        break;
      case '@this':
      default:
        debugger;
        execElem = FAjaxComponent.call.caller();
        break;
    }

    switch (this.render) {
        // @all is no longer useful, the ajax function itself is contained in the page component itself which is basically @all
      case '@all':
        renderElem = this.jsfService.all;
        break;
      case '@form':
        renderElem = this.hFormService.form;
        break;
      case '@this':
      default:
        renderElem = FAjaxComponent.call.caller();
        break;
    }

    this.listener.emit({
      render: renderElem,
      exec: execElem,
    });
  }

}
