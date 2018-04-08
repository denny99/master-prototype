import {
  Component, ElementRef, EventEmitter, Input,
  Output,
} from '@angular/core';
import {Router} from '@angular/router';
import {HFormService} from '../../services/h-form.service';
import JsfElement from '../../superclass/jsf-element';

@Component({
  selector: 'h-command-button',
  templateUrl: './h-command-button.component.html',
  styleUrls: ['./h-command-button.component.css'],
})
export class HCommandButtonComponent extends JsfElement {
  @Input('action')
  route: string;
  @Output()
  action = new EventEmitter<void>();
  @Input()
  immediate = false;

  @Input()
  value: string;

  constructor(
      hFormService: HFormService, private router: Router,
      elementRef: ElementRef) {
    super(hFormService, elementRef);
  }

  async onClick() {
    try {
      await super.onClick();
      if (this.immediate || await this.hFormService.validate()) {
        // did we bind a route to this button or a custom action
        if (this.route) {
          await this.router.navigateByUrl(this.route);
        } else {
          this.action.emit();
        }
      }
    } catch (e) {
      console.error(e);
    }
  }
}
