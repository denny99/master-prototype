import {
  Component, ContentChild, Input, OnInit,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'ui-repeat',
  templateUrl: './ui-repeat.component.html',
  styleUrls: ['./ui-repeat.component.css'],
})
export class UiRepeatComponent implements OnInit {
  @Input()
  value: Array<any>;

  // obsolete use var-*name* in ng-template
  @Input('var')
  varName: string;

  @ContentChild(TemplateRef)
  content: TemplateRef<any>;

  constructor() {
  }

  ngOnInit() {
  }

}
