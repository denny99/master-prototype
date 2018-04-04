import {Component, Input, OnInit} from '@angular/core';
import JsfElement from '../../superclass/jsf-element';
import {HFormService} from '../../services/h-form.service';

@Component({
  selector: 'h-output-text',
  templateUrl: './h-output-text.component.html',
  styleUrls: ['./h-output-text.component.css'],
})
export class HOutputTextComponent extends JsfElement implements OnInit {
  @Input()
  value: any;
  @Input()
  type: string;

  constructor(hFormService: HFormService) {
    super(hFormService);
  }

  ngOnInit() {
  }

}
