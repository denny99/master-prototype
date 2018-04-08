import {
  AfterContentInit, Component, ContentChild, ContentChildren, ElementRef,
  QueryList,
} from '@angular/core';
import {JsfCore} from '../../superclass/jsf-core';
import {COtherwiseComponent} from '../c-otherwise/c-otherwise.component';
import {CWhenComponent} from '../c-when/c-when.component';

@Component({
  selector: 'c-choose',
  templateUrl: './c-choose.component.html',
  styleUrls: ['./c-choose.component.css'],
})
export class CChooseComponent extends JsfCore implements AfterContentInit {
  @ContentChildren(CWhenComponent)
  cwhens: QueryList<CWhenComponent>;

  @ContentChild(COtherwiseComponent)
  cotherwise: COtherwiseComponent;

  private activeElements: Array<CWhenComponent | COtherwiseComponent> = [];

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

  ngAfterContentInit() {
    let otherwise = true;
    for (const cwhen of this.cwhens.toArray()) {
      if (cwhen.test) {
        this.activeElements.push(cwhen);
        otherwise = false;
      }
    }

    if (otherwise) {
      this.activeElements.push(this.cotherwise);
    }
  }

}
