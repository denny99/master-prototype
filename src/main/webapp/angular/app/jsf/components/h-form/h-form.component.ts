import {
  Component, ContentChildren, Input, OnInit,
  QueryList,
} from '@angular/core';
import {HFormService} from '../../services/h-form.service';
import {MessageService} from '../../services/message.service';
import {JsfInput} from '../../superclass/jsf-input';
import {HMessageComponent} from '../h-message/h-message.component';

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
    this.hFormService.form = this;
    this.hFormService.validate = this.validate;
  }

  /**
   *
   * @returns {boolean}
   */
  async validate(): Promise<boolean> {
    let valid = true;
    try {
      const promises: Array<Promise<boolean>> = [];
      for (const input of this.inputs.toArray()) {
        promises.push(input.validate());
      }
      const results = await Promise.all(promises);

      // check if any validation has failed
      for (const result of results) {
        if (!(result)) {
          valid = false;
          break;
        }
      }
    } catch (e) {
      console.error(e);
      valid = false;
    }
    return valid;
  }
}
