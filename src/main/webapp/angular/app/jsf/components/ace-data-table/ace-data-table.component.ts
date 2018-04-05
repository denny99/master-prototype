import {
  AfterViewInit, Component, ContentChildren, Input, OnChanges, OnInit,
  QueryList, ViewChildren,
} from '@angular/core';
import ApiSearchResponse from '../../../entity/ApiSearchResponse';
import {FFacetComponent} from '../f-facet/f-facet.component';
import {AceColumn} from '../../superclass/ace-column';
import {PaginatorComponent} from '../datatable/paginator/paginator.component';

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
    this.currentPage = Math.floor(this.value.offset / this.rows);
    // force update of paginators in case we did not change the current page
    if (this.paginators) {
      this.paginators.forEach((paginator) => {
        paginator.ngOnChanges();
      });
    }
  }

  async setPage(i: number): Promise<void> {
    this.currentPage = i;
    await this.onLoad(i);
  }

}
