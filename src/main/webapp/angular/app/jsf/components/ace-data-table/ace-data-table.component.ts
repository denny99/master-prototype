import {
  AfterViewInit, Component, ContentChildren, Input,
  OnInit,
} from '@angular/core';
import ApiSearchResponse from '../../../entity/ApiSearchResponse';
import {FFacetComponent} from '../f-facet/f-facet.component';
import {AceColumn} from '../../superclass/ace-column';

@Component({
  selector: 'ace-data-table',
  templateUrl: './ace-data-table.component.html',
  styleUrls: ['./ace-data-table.component.css'],
})
export class AceDataTableComponent implements OnInit, AfterViewInit {
  @Input()
  id: string;
  @Input()
  value: ApiSearchResponse<any>;
  @Input()
  onLoad: (currentPage: number) => void;
  @Input()
  rows: number;
  @Input('var')
  varName: string;
  @Input()
  paginator: boolean;
  @ContentChildren(AceColumn)
  columns: Array<AceColumn>;

  private headers: Array<FFacetComponent> = [];

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // call this stuff here as the columns use VieChildren
    this.columns.forEach((column) => {
      if (column.header) {
        this.headers.push(column.header);
      }
    });
  }

}
