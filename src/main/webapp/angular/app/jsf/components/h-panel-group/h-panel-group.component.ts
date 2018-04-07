import {Component, Input, OnInit} from '@angular/core';
import {HFormService} from '../../services/h-form.service';
import JsfElement from '../../superclass/jsf-element';

@Component({
  selector: 'h-panel-group',
  templateUrl: './h-panel-group.component.html',
  styleUrls: ['./h-panel-group.component.css'],
})
export class HPanelGroupComponent extends JsfElement implements OnInit {
  @Input()
  layout: string;

  constructor(hFormService: HFormService) {
    super(hFormService);
  }

  ngOnInit() {
  }

}
