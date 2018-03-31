import {
  Component, ContentChildren, Input, OnInit,
  QueryList,
} from '@angular/core';
import {HMessageComponent} from '../h-message/h-message.component';
import JsfElement from '../../superclass/jsf-element';
import {HFormService} from '../../services/h-form.service';
import {MessageService} from '../../services/message.service';

@Component({
  selector: 'h-form',
  templateUrl: './h-form.component.html',
  styleUrls: ['./h-form.component.css'],
  providers: [
    HFormService,
    MessageService],
})
export class HFormComponent implements OnInit {
  @Input()
  id: string;

  @Input()
  styleClass: string;

  @Input()
  style: string;

  @ContentChildren(HMessageComponent, {descendants: true})
  messages: QueryList<HMessageComponent>;

  @ContentChildren(JsfElement, {descendants: true})
  elements: QueryList<JsfElement>;

  constructor(private hFormService: HFormService) {
  }

  ngOnInit() {
    this.hFormService.formId = this.id;
  }
}
