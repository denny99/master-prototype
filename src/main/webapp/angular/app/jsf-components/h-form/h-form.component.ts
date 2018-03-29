import {Component, ContentChildren, OnInit, QueryList,} from '@angular/core';
import {HMessageComponent} from '../h-message/h-message.component';

@Component({
  selector: 'h-form',
  templateUrl: './h-form.component.html',
  styleUrls: ['./h-form.component.css'],
})
export class HFormComponent implements OnInit {
  @ContentChildren(HMessageComponent, {descendants: true})
  messages: QueryList<HMessageComponent>;

  constructor() {
  }

  ngOnInit() {
  }
}
