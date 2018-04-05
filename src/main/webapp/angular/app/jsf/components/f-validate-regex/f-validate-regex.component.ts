import {Component, Input, OnInit} from '@angular/core';
import {isEmpty} from 'lodash';

@Component({
  selector: 'f-validate-regex',
  templateUrl: './f-validate-regex.component.html',
  styleUrls: ['./f-validate-regex.component.css'],
})
export class FValidateRegexComponent implements OnInit {
  @Input()
  pattern: string;

  constructor() {
  }

  ngOnInit() {
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
