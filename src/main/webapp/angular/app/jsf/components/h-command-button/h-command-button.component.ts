import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import JsfElement from '../../superclass/jsf-element';
import {HFormService} from '../../services/h-form.service';

@Component({
  selector: 'h-command-button',
  templateUrl: './h-command-button.component.html',
  styleUrls: ['./h-command-button.component.css'],
})
export class HCommandButtonComponent extends JsfElement implements OnInit {
  @Input('action')
  route: string;
  @Output()
  action = new EventEmitter<void>();
  @Input()
  immediate = false;

  @Input()
  value: string;

  constructor(hFormService: HFormService, private router: Router) {
    super(hFormService);
  }

  ngOnInit() {
  }

  async onClick() {
    try {
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
