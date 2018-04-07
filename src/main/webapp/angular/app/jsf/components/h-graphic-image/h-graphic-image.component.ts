import {Component, Input} from '@angular/core';
import {HFormService} from '../../services/h-form.service';
import JsfElement from '../../superclass/jsf-element';

@Component({
  selector: 'h-graphic-image',
  templateUrl: './h-graphic-image.component.html',
  styleUrls: ['./h-graphic-image.component.css'],
})
export class HGraphicImageComponent extends JsfElement {
  @Input()
  library: string;
  @Input()
  name: string;

  constructor(hFormService: HFormService) {
    super(hFormService);
  }
}
