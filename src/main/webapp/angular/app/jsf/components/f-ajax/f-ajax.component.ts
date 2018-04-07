import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HFormService} from '../../services/h-form.service';
import JsfElement from '../../superclass/jsf-element';
import {HFormComponent} from '../h-form/h-form.component';

@Component({
  selector: 'f-ajax',
  templateUrl: './f-ajax.component.html',
  styleUrls: ['./f-ajax.component.css'],
})
export class FAjaxComponent implements OnInit {
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
  listener = new EventEmitter<JsfElement | HFormComponent>();

  this: object;

  constructor(private hFormService: HFormService) {
  }

  ngOnInit() {
  }

  /**
   * trigger ajax call
   */
  call() {
    let elem: JsfElement | HFormComponent;
    switch (this.event) {
        // @all is no longer useful, the ajax function itself is contained in the page component itself which is basically @all
      case '@all':
      case '@form':
        elem = this.hFormService.form;
        break;
      case '@this':
      default:
        debugger;
        elem = FAjaxComponent.call.caller();
        break;
    }

    this.listener.emit(elem);
  }

}
