import {
  Component, EventEmitter, Input, OnChanges, OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'ace-data-table-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
})
export class PaginatorComponent implements OnInit, OnChanges {
  @Input()
  currentPage: number;
  @Input()
  pageSize: number;
  @Input()
  maxResults: number;
  @Input()
  top: boolean;
  @Input()
  parentId: string;
  @Output()
  newPage = new EventEmitter<number>();

  private maxPage: number;
  private pageLinks: Array<number>;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(): void {
    this.maxPage = Math.ceil(this.maxResults / this.pageSize);
    this.pageLinks = [];
    const startPage = Math.max(1, this.currentPage -
        (this.currentPage + 5 > this.maxPage ?
            9 - (this.maxPage - this.currentPage) : 5));
    const endPage = Math.min(this.maxPage,
        this.currentPage < 7 ? 10 : (this.currentPage + 4));

    for (let i = startPage, j = endPage; i <=
    j; i++) {
      this.pageLinks.push(i);
    }
  }

  setPage(e: Event, i: number): void {
    e.preventDefault();
    this.newPage.emit(i);
  }
}
