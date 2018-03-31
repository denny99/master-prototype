import {Component, Input, OnInit} from '@angular/core';
import JsfElement from '../../superclass/jsf-element';
import {HFormService} from '../../services/h-form.service';

@Component({
  selector: 'ice-output-link',
  templateUrl: './ice-output-link.component.html',
  styleUrls: ['./ice-output-link.component.css'],
})
export class IceOutputLinkComponent extends JsfElement implements OnInit {
  @Input()
  type: string;

  @Input()
  value: string;

  constructor(hFormService: HFormService) {
    super(hFormService);
  }

  ngOnInit() {
  }

}
