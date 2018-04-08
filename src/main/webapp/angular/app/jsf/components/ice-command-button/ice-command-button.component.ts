import {Component, ElementRef, Input} from '@angular/core';
import {Router} from '@angular/router';
import {HFormService} from '../../services/h-form.service';
import {HCommandButtonComponent} from '../h-command-button/h-command-button.component';

@Component({
  selector: 'ice-command-button',
  templateUrl: './ice-command-button.component.html',
  styleUrls: ['./ice-command-button.component.css'],
})
export class IceCommandButtonComponent extends HCommandButtonComponent {
  @Input()
  partialSubmit: boolean;

  constructor(
      hFormService: HFormService, router: Router, elementRef: ElementRef) {
    super(hFormService, router, elementRef);
  }

  forwardOutput() {
    this.action.emit();
  }
}
