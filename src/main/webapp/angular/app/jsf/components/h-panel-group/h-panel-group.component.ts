import {Component, OnInit} from '@angular/core';
import JsfElement from '../../superclass/jsf-element';
import {HFormService} from '../../services/h-form.service';

@Component({
  selector: 'h-panel-group',
  templateUrl: './h-panel-group.component.html',
  styleUrls: ['./h-panel-group.component.css'],
})
export class HPanelGroupComponent extends JsfElement implements OnInit {

  constructor(hFormService: HFormService) {
    super(hFormService);
  }

  ngOnInit() {
  }

}
