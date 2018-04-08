import {Component, ElementRef} from '@angular/core';
import {HFormService} from '../../services/h-form.service';
import {HOutputTextComponent} from '../h-output-text/h-output-text.component';

@Component({
  selector: 'ice-output-text',
  templateUrl: './ice-output-text.component.html',
  styleUrls: ['./ice-output-text.component.css'],
})
export class IceOutputTextComponent extends HOutputTextComponent {
  constructor(hFormService: HFormService, elementRef: ElementRef) {
    super(hFormService, elementRef);
  }
}
