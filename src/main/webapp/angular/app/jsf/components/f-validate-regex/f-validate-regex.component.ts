import {Component, ElementRef, Input} from '@angular/core';
import {isEmpty} from 'lodash';
import {JsfCore} from '../../superclass/jsf-core';

@Component({
  selector: 'f-validate-regex',
  templateUrl: './f-validate-regex.component.html',
  styleUrls: ['./f-validate-regex.component.css'],
})
export class FValidateRegexComponent extends JsfCore {
  @Input()
  pattern: string;

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

  /**
   * checks string for regular expression
   * @param {string} content
   * @returns {boolean} true when regex ok
   */
  validate(content: string): boolean {
    if (!isEmpty(content)) {
      return content.match(this.pattern) !== null;
    } else {
      return true;
    }
  }
}
