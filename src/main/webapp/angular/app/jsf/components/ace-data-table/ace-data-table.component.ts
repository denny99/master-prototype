import {
  AfterViewInit, Component, ContentChildren, EventEmitter, Input,
  OnChanges, OnInit, Output, QueryList, ViewChildren,
} from '@angular/core';
import ApiSearchResponse from '../../../entity/ApiSearchResponse';
import {FFacetComponent} from '../f-facet/f-facet.component';
import {PaginatorComponent} from '../datatable/paginator/paginator.component';
import {AceColumnComponent} from '../ace-column/ace-column.component';

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
  columns: Array<AceColumnComponent>;

  @ViewChildren(PaginatorComponent)
  paginators: QueryList<PaginatorComponent>;

  private currentPage: number;
  private headers: Array<FFacetComponent> = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  async ngAfterViewInit() {
    // call this stuff here as the columns use VieChildren
    this.columns.forEach((column) => {
      if (column.header) {
        this.headers.push(column.header);
      }
    });
  }

  ngOnChanges(): void {
    this.currentPage = Math.floor(this.value.offset / this.rows) + 1;
    // force update of paginators in case we did not change the current page
    if (this.paginators) {
      this.paginators.forEach((paginator) => {
        paginator.ngOnChanges();
      });
    }
  }

  setPage(i: number): void {
    this.currentPage = i;
    this.onLoad.emit(i);
  }

}
