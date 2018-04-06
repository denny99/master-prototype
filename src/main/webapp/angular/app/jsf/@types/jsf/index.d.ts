declare namespace ice {
  namespace ace {
    class Tooltip {
      constructor(id: string, options: IAceTooltipOptions);
    }

    interface IAceTooltipOptions {
      speechBubble: boolean;
      content: JQuery<HTMLElement>;
      show: IAceTooltipEffectOptions;
      position: IAceTooltipPosition;
      hide: IAceTooltipEffectOptions;
      styleClass: string;
      forComponent: string;
      style: IAceTooltipStyleOptions;
    }

    interface IAceTooltipEffectOptions {
      effect: (offset: number) => void;
      delay: number;
    }

    interface IAceTooltipPosition {
      my: string;
      at: string;
    }

    interface IAceTooltipStyleOptions {
      classes: string;
    }
  }
}

declare class ToolTipPanelPopup {
  constructor(
      srcComp, tooltipCompId, event, hideOn, delay, dynamic, formId, ctxValue,
      iFrameUrl, displayOn, moveWithMouse);
}