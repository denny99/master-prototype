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
import {AceDataTableComponent} from './components/ace-data-table/ace-data-table.component';
import {PaginatorComponent} from './components/datatable/paginator/paginator.component';
import {FFacetComponent} from './components/f-facet/f-facet.component';
import {HOutputTextComponent} from './components/h-output-text/h-output-text.component';
import {FValidateRegexComponent} from './components/f-validate-regex/f-validate-regex.component';
import {HSelectOneMenuComponent} from './components/h-select-one-menu/h-select-one-menu.component';
import {HPanelGridComponent} from './components/h-panel-grid/h-panel-grid.component';
import {FSelectItemComponent} from './components/f-select-item/f-select-item.component';
import {FSelectItemsComponent} from './components/f-select-items/f-select-items.component';

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
    IceOutputLinkComponent,
    AceDataTableComponent,
    PaginatorComponent,
    FFacetComponent,
    HOutputTextComponent,
    FValidateRegexComponent,
    HSelectOneMenuComponent,
    HPanelGridComponent,
    FSelectItemComponent,
    FSelectItemsComponent],
  declarations: [
    HFormComponent,
    HCommandButtonComponent,
    HPanelGroupComponent,
    HMessageComponent,
    HInputTextComponent,
    IceOutputLinkComponent,
    AceDataTableComponent,
    PaginatorComponent,
    FFacetComponent,
    HOutputTextComponent,
    FValidateRegexComponent,
    HSelectOneMenuComponent,
    HPanelGridComponent,
    FSelectItemComponent,
    FSelectItemsComponent],
  providers: [
    HFormService,
  ],
})
export class JsfModule {
}
