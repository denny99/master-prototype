import {
  AfterViewInit, Component, ContentChildren, EventEmitter, Input,
  OnChanges, OnInit, Output, QueryList, ViewChildren,
} from '@angular/core';
import ApiSearchResponse from '../../../entity/ApiSearchResponse';
import {AceColumnComponent} from '../ace-column/ace-column.component';
import {PaginatorComponent} from '../datatable/paginator/paginator.component';
import {FFacetComponent} from '../f-facet/f-facet.component';

@Component({
  selector: 'ace-data-table',
  templateUrl: './ace-data-table.component.html',
  styleUrls: ['./ace-data-table.component.css'],
})
export class AceDataTableComponent implements OnInit, AfterViewInit, OnChanges {
  @Input()
  id: string;
  @Input()
  value: ApiSearchResponse<any> = new ApiSearchResponse<any>();
  @Output()
  onLoad = new EventEmitter<number>();
  @Input()
  rows: number;
  @Input('var')
  varName: string;
  @Input()
  paginator: boolean;

  @ContentChildren(AceColumnComponent)
  columns: QueryList<AceColumnComponent>;

  @ViewChildren(PaginatorComponent)
  paginators: QueryList<PaginatorComponent>;

  private currentPage: number;
  private headers: Array<FFacetComponent> = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    // call this stuff here as the columns use VieChildren
    for (const column of this.columns.toArray()) {
      if (column.header) {
        this.headers.push(column.header);
      }
    }
  }

  ngOnChanges(): void {
    this.currentPage = Math.floor(this.value.offset / this.rows) + 1;
    // force update of paginators in case we did not change the current page
    if (this.paginators) {
      for (const paginator of this.paginators.toArray()) {
        paginator.ngOnChanges();
      }
    }
  }

  setPage(i: number): void {
    this.currentPage = i;
    this.onLoad.emit(i);
  }

}
