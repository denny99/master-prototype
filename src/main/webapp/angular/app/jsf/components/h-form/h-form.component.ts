import {
  Component, ContentChildren, Input, OnInit,
  QueryList,
} from '@angular/core';
import {IJsfLifecycle} from '../../interfaces/jsf-lifecycle';
import {HFormService} from '../../services/h-form.service';
import {MessageService} from '../../services/message.service';
import {JsfCore} from '../../superclass/jsf-core';
import JsfElement from '../../superclass/jsf-element';
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
export class HFormComponent extends JsfCore implements OnInit, IJsfLifecycle {
  @Input()
  styleClass: string;

  @Input()
  style: string;

  @ContentChildren(HMessageComponent, {descendants: true})
  messages: QueryList<HMessageComponent>;

  @ContentChildren(JsfInput, {descendants: true})
  inputs: QueryList<JsfInput>;

  @ContentChildren(JsfElement, {descendants: true})
  elements: QueryList<JsfElement>;

  constructor(private hFormService: HFormService) {
    super();

    this.validate = this.validate.bind(this);
  }

  ngOnInit(): void {
    this.hFormService.form = this;
    this.hFormService.validate = this.validate;
  }

  /**
   *
   * @param {boolean} skipChildren true = calls jsfOnRender on all children
   * @returns {Promise<void>}
   */
  async jsfOnRender(skipChildren?: boolean) {
    try {
      if (!skipChildren) {
        for (const element of this.elements.toArray()) {
          await element.jsfOnRender();
        }
      }
      await this.validate(true);
    } catch (e) {
      console.error(e);
    }
  }

  async validateInputs(): Promise<boolean> {
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

  /**
   * @param {boolean} [skipInputs]
   * @returns {boolean}
   */
  async validate(skipInputs?: boolean): Promise<boolean> {
    let valid = true;

    // grab events and validate

    if (!skipInputs) {
      valid = await this.validateInputs();
    }

    this.triggerEvent('postValidate');

    return valid;
  }
}
