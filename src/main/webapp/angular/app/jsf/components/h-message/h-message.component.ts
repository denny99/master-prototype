import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {ErrorMessage} from '../../objects/error-message';
import {HFormService} from '../../services/h-form.service';
import {MessageService} from '../../services/message.service';
import JsfElement from '../../superclass/jsf-element';

@Component({
  selector: 'h-message',
  templateUrl: './h-message.component.html',
  styleUrls: ['./h-message.component.css'],
})
export class HMessageComponent extends JsfElement implements OnInit, OnDestroy {
  @Input('for')
  forId: string;

  errorMessage = new ErrorMessage();
  private subscription: Subscription;

  constructor(
      hFormService: HFormService, private messageService: MessageService) {
    super(hFormService);
  }

  ngOnInit() {
    this.subscription = this.messageService.subscribe(this.forId,
        (value: ErrorMessage) => {
          this.errorMessage = value;
        });
  }

  ngOnDestroy() {
    // in case we did not init at all
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
