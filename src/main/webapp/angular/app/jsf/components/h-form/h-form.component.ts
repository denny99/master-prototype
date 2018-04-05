import {
  Component, ContentChildren, Input, OnInit,
  QueryList,
} from '@angular/core';
import {HMessageComponent} from '../h-message/h-message.component';
import {HFormService} from '../../services/h-form.service';
import {MessageService} from '../../services/message.service';
import {JsfInput} from '../../superclass/jsf-input';

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

  @ContentChildren(JsfInput, {descendants: true})
  inputs: QueryList<JsfInput>;

  constructor(private hFormService: HFormService) {
    this.validate = this.validate.bind(this);
  }

  ngOnInit(): void {
    this.hFormService.formId = this.id;
    this.hFormService.validate = this.validate;
  }

  /**
   *
   * @returns {boolean}
   */
  validate(): boolean {
    let valid = true;
    this.inputs.forEach((input) => {
      if (!input.validate()) {
        valid = false;
      }
    });
    return valid;
  }
}
