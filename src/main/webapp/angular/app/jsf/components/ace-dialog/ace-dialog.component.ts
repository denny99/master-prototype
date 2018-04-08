import {
  AfterViewInit, Component, ElementRef, Input, OnChanges,
  ViewChild,
} from '@angular/core';
import {merge} from 'lodash';
import {HFormService} from '../../services/h-form.service';
import JsfElement from '../../superclass/jsf-element';

@Component({
  selector: 'ace-dialog',
  templateUrl: './ace-dialog.component.html',
  styleUrls: ['./ace-dialog.component.css'],
})
export class AceDialogComponent extends JsfElement implements AfterViewInit, OnChanges {
  static visibleStyle = {
    display: 'block',
    zIndex: 1002,
    outline: 0,
    height: 'auto',
    minWidth: '150px',
    width: 'auto',
  };
  static invisibleStyle = {display: 'none', zIndex: 1000, outline: 0};

  @Input()
  header: string;
  @Input()
  visible: boolean;
  @Input()
  closable: boolean;
  @Input()
  modal: boolean;
  @Input()
  draggable: boolean;
  @Input()
  resizable: boolean;
  @Input()
  showEffect: string;
  @Input()
  hideEffect: string;
  @Input()
  showHeader: boolean;

  @ViewChild('dialog')
  private dialog: ElementRef;

  private window = window;
  private width: number;
  private height: number;

  constructor(hFormService: HFormService, elementRef: ElementRef) {
    super(hFormService, elementRef);

    this.style = AceDialogComponent.visibleStyle;
  }

  hide(event: Event): void {
    event.preventDefault();
    this.visible = false;
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    this.width = this.dialog.nativeElement.offsetWidth;
    this.height = this.dialog.nativeElement.offsetHeight;
  }

  ngOnChanges() {
    const self = this;
    setTimeout(() => {
      const style = {
        left: `${window.innerWidth / 2 -
        (self.width / 2)}px`,
        top: `${window.innerHeight / 2 -
        (self.height / 2)}px`,
      };
      self.style = merge(style, self.visible ?
          AceDialogComponent.visibleStyle :
          AceDialogComponent.invisibleStyle);
    }, 0);
  }
}
