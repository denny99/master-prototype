import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';

@Component({
  selector: 'c-when',
  templateUrl: './c-when.component.html',
  styleUrls: ['./c-when.component.css'],
})
export class CWhenComponent implements OnInit {
  @Input()
  test: boolean;

  @ViewChild(TemplateRef)
  content: TemplateRef<any>;

  constructor() {
  }

  ngOnInit() {
  }

}
