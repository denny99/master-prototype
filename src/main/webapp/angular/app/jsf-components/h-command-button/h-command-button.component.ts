import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'h-command-button',
  templateUrl: './h-command-button.component.html',
  styleUrls: ['./h-command-button.component.css'],
})
export class HCommandButtonComponent implements OnInit {
  @Input()
  id: string;

  @Input()
  action: string;

  @Input()
  value: string;

  @Input()
  styleClass: string;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  async onClick() {
    await this.router.navigateByUrl(this.action);
  }
}
