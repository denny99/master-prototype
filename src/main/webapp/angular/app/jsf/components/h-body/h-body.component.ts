import {Component, ContentChildren, OnInit, QueryList} from '@angular/core';
import {IJsfLifecycle} from '../../interfaces/jsf-lifecycle';
import {JsfService} from '../../services/jsf.service';
import {JsfCore} from '../../superclass/jsf-core';
import JsfElement from '../../superclass/jsf-element';
import {HFormComponent} from '../h-form/h-form.component';

@Component({
  selector: 'h-body',
  templateUrl: './h-body.component.html',
  styleUrls: ['./h-body.component.css'],
  providers: [
    JsfService,
  ],
})
export class HBodyComponent extends JsfCore implements OnInit, IJsfLifecycle {
  @ContentChildren(JsfElement, {descendants: true})
  elements: QueryList<JsfElement>;

  @ContentChildren(HFormComponent, {descendants: true})
  forms: QueryList<HFormComponent>;

  constructor(private jsfService: JsfService) {
    super();
  }

  ngOnInit() {
    this.jsfService.all = this;
  }

  async jsfOnRender() {
    try {
      for (const element of this.elements.toArray()) {
        await element.jsfOnRender();
      }
      for (const form of this.forms.toArray()) {
        await form.jsfOnRender(true);
      }
    } catch (e) {
      console.error(e);
    }
  }

}
