import {Component, Input, OnInit, TemplateRef, ViewChild,} from '@angular/core';

@Component({
  selector: 'f-facet',
  templateUrl: './f-facet.component.html',
  styleUrls: ['./f-facet.component.css'],
})
export class FFacetComponent implements OnInit {
  @Input()
  name: string;

  @ViewChild(TemplateRef)
  content: TemplateRef<any>;

  constructor() {
  }

  ngOnInit() {
  }

}
