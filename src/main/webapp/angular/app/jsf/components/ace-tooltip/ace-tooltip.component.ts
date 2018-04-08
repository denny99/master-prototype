import {
  AfterViewInit, Component, ElementRef, Input,
  OnInit,
} from '@angular/core';
import {HFormService} from '../../services/h-form.service';
import JsfElement from '../../superclass/jsf-element';

@Component({
  selector: 'ace-tooltip',
  templateUrl: './ace-tooltip.component.html',
  styleUrls: ['./ace-tooltip.component.css'],
})
export class AceTooltipComponent extends JsfElement implements OnInit, AfterViewInit {
  @Input('for')
  forId: string;
  @Input()
  speechBubble = false;
  @Input()
  showEffect = 'slide';
  @Input()
  hideEffect = 'slide';
  @Input()
  showDelay = 200;
  @Input()
  hideDelay = 100;
  @Input()
  position: 'bottomLeft';
  @Input()
  targetPosition: 'bottomRight';
  @Input()
  showEffectLength = 200;
  @Input()
  hideEffectLength = 200;

  private internalShowEffect: string;
  private internalHideEffect: string;
  private showEffectOptions: { origin: string[] };
  private hideEffectOptions: { origin: string[] };
  private tooltip: ice.ace.Tooltip;

  constructor(hFormService: HFormService, elementRef: ElementRef) {
    super(hFormService, elementRef);
  }

  ngOnInit() {
    switch (this.showEffect) {
      case 'slide':
      default:
        this.internalShowEffect = 'scale';
        this.showEffectOptions = {
          origin: ['top', 'left'],
        };
        break;
    }

    switch (this.hideEffect) {
      case 'slide':
      default:
        this.internalHideEffect = 'scale';
        this.hideEffectOptions = {
          origin: ['top', 'left'],
        };
        break;
    }
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    const self = this;
    this.tooltip = new ice.ace.Tooltip(this.id, {
      speechBubble: this.speechBubble,
      content: $(`#${this.id}`.replace(':', '\\:')).next(),
      show: {
        effect: function() {
          this.toggle(self.internalShowEffect, self.showEffectOptions,
              self.showEffectLength); // "this" refers to the tooltip
        },
        delay: this.showDelay,
      },
      position: {
        my: this.position,
        at: this.targetPosition,
      },
      hide: {
        effect: function() {
          this.toggle(self.internalHideEffect, self.hideEffectOptions,
              self.hideEffectLength); // "this" refers to the tooltip
        },
        delay: this.hideDelay,
      },
      styleClass: this.styleClass,
      forComponent: this.hFormService.getFormId(this.forId),
      style: {
        classes: 'ui-tooltip-content',
      },
    });
  }

}
