import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ui-fragment',
  templateUrl: './ui-fragment.component.html',
  styleUrls: ['./ui-fragment.component.css'],
})
export class UiFragmentComponent implements OnInit {
  @Input()
  rendered: boolean;

  constructor() {
  }

  ngOnInit() {
  }

}
