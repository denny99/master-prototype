import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import JsfElement from '../../superclass/jsf-element';
import {HFormService} from '../../services/h-form.service';

@Component({
  selector: 'h-command-button',
  templateUrl: './h-command-button.component.html',
  styleUrls: ['./h-command-button.component.css'],
})
export class HCommandButtonComponent extends JsfElement implements OnInit {
  @Input()
  action: string;

  @Input()
  value: string;

  constructor(hFormService: HFormService, private router: Router) {
    super(hFormService);
  }

  ngOnInit() {
  }

  async onClick() {
    await this.router.navigateByUrl(this.action);
  }
}
