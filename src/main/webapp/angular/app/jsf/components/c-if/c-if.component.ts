import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'c-if',
  templateUrl: './c-if.component.html',
  styleUrls: ['./c-if.component.css'],
})
export class CIfComponent implements OnInit {
  @Input()
  test: boolean;

  constructor() {
  }

  ngOnInit() {
  }

}
