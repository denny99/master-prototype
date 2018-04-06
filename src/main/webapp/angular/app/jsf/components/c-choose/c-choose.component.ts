import {
  AfterViewInit, Component, ContentChild, ContentChildren, OnInit,
  QueryList,
} from '@angular/core';
import {CWhenComponent} from '../c-when/c-when.component';
import {COtherwiseComponent} from '../c-otherwise/c-otherwise.component';

@Component({
  selector: 'c-choose',
  templateUrl: './c-choose.component.html',
  styleUrls: ['./c-choose.component.css'],
})
export class CChooseComponent implements OnInit, AfterViewInit {
  @ContentChildren(CWhenComponent)
  cwhens: QueryList<CWhenComponent>;

  @ContentChild(COtherwiseComponent)
  cotherwise: COtherwiseComponent;

  private activeElements: Array<CWhenComponent | COtherwiseComponent> = [];

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    let otherwise = true;
    this.cwhens.forEach((cwhen) => {
      if (cwhen.test) {
        this.activeElements.push(cwhen);
        otherwise = false;
      }
    });

    if (otherwise) {
      this.activeElements.push(this.cotherwise);
    }
  }

}
