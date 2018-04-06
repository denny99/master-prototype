import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';

@Component({
  selector: 'c-otherwise',
  templateUrl: './c-otherwise.component.html',
  styleUrls: ['./c-otherwise.component.css'],
})
export class COtherwiseComponent implements OnInit {
  @ViewChild(TemplateRef)
  content: TemplateRef<any>;

  constructor() {
  }

  ngOnInit() {
  }

}
