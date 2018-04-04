import {
  Component, ElementRef, Input, OnInit, TemplateRef,
  ViewChild,
} from '@angular/core';
import JsfElement from '../../superclass/jsf-element';
import {HFormService} from '../../services/h-form.service';

@Component({
  selector: 'f-select-item',
  templateUrl: './f-select-item.component.html',
  styleUrls: ['./f-select-item.component.css'],
})
export class FSelectItemComponent extends JsfElement implements OnInit {
  @Input()
  value: any;
  @Input()
  itemLabel: string;
  @Input()
  noSelectionOption: boolean;

  @ViewChild('radio') radio: TemplateRef<any>;
  @ViewChild('option') option: TemplateRef<any>;

  @ViewChild('radioInput') radioInput: ElementRef;
  @ViewChild('optionElem') optionElem: ElementRef;

  private radioId = `${this.hFormService.formId}:${this.simpleId}`;

  constructor(hFormService: HFormService) {
    super(hFormService);
  }

  ngOnInit() {
    if (this.noSelectionOption) {
      this.value = '';
    }
  }
}
