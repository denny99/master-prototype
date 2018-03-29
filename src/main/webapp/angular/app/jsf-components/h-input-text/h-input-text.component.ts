import {Component, OnInit, ViewChild} from '@angular/core';
import {NG_VALUE_ACCESSOR, NgModel} from '@angular/forms';
import Input from '../../jsf-classes/superclass/Input';

@Component({
  selector: 'h-input-text',
  templateUrl: './h-input-text.component.html',
  styleUrls: ['./h-input-text.component.css'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: HInputTextComponent, multi: true},
  ],
})
export class HInputTextComponent extends Input implements OnInit {
  @ViewChild(NgModel) model: NgModel;

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
