import {Component, forwardRef, OnInit, ViewChild} from '@angular/core';
import {NG_VALUE_ACCESSOR, NgModel} from '@angular/forms';
import {HFormService} from '../../services/h-form.service';
import {MessageService} from '../../services/message.service';
import {JsfInput} from '../../superclass/jsf-input';

@Component({
  selector: 'h-input-text',
  templateUrl: './h-input-text.component.html',
  styleUrls: ['./h-input-text.component.css'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: HInputTextComponent, multi: true},
    {
      provide: JsfInput,
      useExisting: forwardRef(() => HInputTextComponent),
    },
  ],
})
export class HInputTextComponent extends JsfInput implements OnInit {
  @ViewChild(NgModel) model: NgModel;

  constructor(hFormService: HFormService, messageService: MessageService) {
    super(hFormService, messageService);
  }

  ngOnInit() {
  }

}
