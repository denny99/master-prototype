import {Component, Input, OnInit} from '@angular/core';
import {HFormService} from '../../services/h-form.service';
import {JsfOutput} from '../../superclass/jsf-output';

@Component({
  selector: 'ice-output-text',
  templateUrl: './ice-output-text.component.html',
  styleUrls: ['./ice-output-text.component.css'],
})
export class IceOutputTextComponent extends JsfOutput implements OnInit {
  @Input()
  type: string;

  constructor(hFormService: HFormService) {
    super(hFormService);
  }

  ngOnInit() {
  }

}
