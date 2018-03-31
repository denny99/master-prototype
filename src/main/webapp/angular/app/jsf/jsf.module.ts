import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HFormComponent} from './components/h-form/h-form.component';
import {HCommandButtonComponent} from './components/h-command-button/h-command-button.component';
import {HPanelGroupComponent} from './components/h-panel-group/h-panel-group.component';
import {HMessageComponent} from './components/h-message/h-message.component';
import {HInputTextComponent} from './components/h-input-text/h-input-text.component';
import {FormsModule} from '@angular/forms';
import {IceOutputLinkComponent} from './components/ice-output-link/ice-output-link.component';
import {HFormService} from './services/h-form.service';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
  ],
  exports: [
    HFormComponent,
    HCommandButtonComponent,
    HPanelGroupComponent,
    HMessageComponent,
    HInputTextComponent,
    IceOutputLinkComponent],
  declarations: [
    HFormComponent,
    HCommandButtonComponent,
    HPanelGroupComponent,
    HMessageComponent,
    HInputTextComponent,
    IceOutputLinkComponent],
  providers: [
    HFormService,
  ],
})
export class JsfModule {
}
