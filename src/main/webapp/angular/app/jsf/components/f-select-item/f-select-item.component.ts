import {
  Component, ElementRef, Input, OnInit, TemplateRef,
  ViewChild,
} from '@angular/core';
import {HFormService} from '../../services/h-form.service';
import {JsfCore} from '../../superclass/jsf-core';

@Component({
  selector: 'f-select-item',
  templateUrl: './f-select-item.component.html',
  styleUrls: ['./f-select-item.component.css'],
})
export class FSelectItemComponent extends JsfCore implements OnInit {
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

  private radioId = this.hFormService.getFormId(this.id);

  constructor(private hFormService: HFormService) {
    super();
  }

  ngOnInit() {
    if (this.noSelectionOption) {
      this.value = '';
    }
  }
}
