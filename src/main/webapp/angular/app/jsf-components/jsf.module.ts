import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HFormComponent} from './h-form/h-form.component';
import {HCommandButtonComponent} from './h-command-button/h-command-button.component';
import {HPanelGroupComponent} from './h-panel-group/h-panel-group.component';
import {HMessageComponent} from './h-message/h-message.component';
import {HInputTextComponent} from './h-input-text/h-input-text.component';
import {FormsModule} from '@angular/forms';

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
    HInputTextComponent],
  declarations: [
    HFormComponent,
    HCommandButtonComponent,
    HPanelGroupComponent,
    HMessageComponent,
    HInputTextComponent],
})
export class JsfModule {
}
