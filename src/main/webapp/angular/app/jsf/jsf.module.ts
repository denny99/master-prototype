import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HFormComponent} from './h-form/h-form.component';
import {HCommandButtonComponent} from './h-command-button/h-command-button.component';
import {HPanelGroupComponent} from './h-panel-group/h-panel-group.component';
import {HMessageComponent} from './h-message/h-message.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    HFormComponent,
    HCommandButtonComponent,
    HPanelGroupComponent,
    HMessageComponent],
  declarations: [
    HFormComponent,
    HCommandButtonComponent,
    HPanelGroupComponent,
    HMessageComponent],
})
export class JsfModule {
}
