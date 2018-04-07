import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AceColumnComponent} from './components/ace-column/ace-column.component';
import {AceDataTableComponent} from './components/ace-data-table/ace-data-table.component';
import {AceTooltipComponent} from './components/ace-tooltip/ace-tooltip.component';
import {CChooseComponent} from './components/c-choose/c-choose.component';
import {CIfComponent} from './components/c-if/c-if.component';
import {COtherwiseComponent} from './components/c-otherwise/c-otherwise.component';
import {CWhenComponent} from './components/c-when/c-when.component';
import {PaginatorComponent} from './components/datatable/paginator/paginator.component';
import {FAjaxComponent} from './components/f-ajax/f-ajax.component';
import {FConvertNumberComponent} from './components/f-convert-number/f-convert-number.component';
import {FEventComponent} from './components/f-event/f-event.component';
import {FFacetComponent} from './components/f-facet/f-facet.component';
import {FSelectItemComponent} from './components/f-select-item/f-select-item.component';
import {FSelectItemsComponent} from './components/f-select-items/f-select-items.component';
import {FValidateRegexComponent} from './components/f-validate-regex/f-validate-regex.component';
import {HBodyComponent} from './components/h-body/h-body.component';
import {HCommandButtonComponent} from './components/h-command-button/h-command-button.component';
import {HFormComponent} from './components/h-form/h-form.component';
import {HGraphicImageComponent} from './components/h-graphic-image/h-graphic-image.component';
import {HInputHiddenComponent} from './components/h-input-hidden/h-input-hidden.component';
import {HInputTextComponent} from './components/h-input-text/h-input-text.component';
import {HMessageComponent} from './components/h-message/h-message.component';
import {HOutputLabelComponent} from './components/h-output-label/h-output-label.component';
import {HOutputTextComponent} from './components/h-output-text/h-output-text.component';
import {HPanelGridComponent} from './components/h-panel-grid/h-panel-grid.component';
import {HPanelGroupComponent} from './components/h-panel-group/h-panel-group.component';
import {HSelectBooleanCheckboxComponent} from './components/h-select-boolean-checkbox/h-select-boolean-checkbox.component';
import {HSelectOneMenuComponent} from './components/h-select-one-menu/h-select-one-menu.component';
import {IceOutputLinkComponent} from './components/ice-output-link/ice-output-link.component';
import {IceOutputTextComponent} from './components/ice-output-text/ice-output-text.component';
import {IcePanelGroupComponent} from './components/ice-panel-group/ice-panel-group.component';
import {IcePanelPopupComponent} from './components/ice-panel-popup/ice-panel-popup.component';
import {UiFragmentComponent} from './components/ui-fragment/ui-fragment.component';
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
    IceOutputLinkComponent,
    AceDataTableComponent,
    PaginatorComponent,
    FFacetComponent,
    HOutputTextComponent,
    FValidateRegexComponent,
    HSelectOneMenuComponent,
    HPanelGridComponent,
    FSelectItemComponent,
    FSelectItemsComponent,
    AceColumnComponent,
    CIfComponent,
    CChooseComponent,
    CWhenComponent,
    COtherwiseComponent,
    UiFragmentComponent,
    IcePanelGroupComponent,
    FAjaxComponent,
    IceOutputTextComponent,
    FConvertNumberComponent,
    HInputHiddenComponent,
    HOutputLabelComponent,
    HSelectBooleanCheckboxComponent,
    AceTooltipComponent,
    HBodyComponent,
    FEventComponent,
    HGraphicImageComponent,
    IcePanelPopupComponent],
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
    FSelectItemsComponent,
    AceColumnComponent,
    CIfComponent,
    CChooseComponent,
    CWhenComponent,
    COtherwiseComponent,
    UiFragmentComponent,
    IcePanelGroupComponent,
    FAjaxComponent,
    IceOutputTextComponent,
    FConvertNumberComponent,
    HInputHiddenComponent,
    HOutputLabelComponent,
    HSelectBooleanCheckboxComponent,
    AceTooltipComponent,
    HBodyComponent,
    FEventComponent,
    HGraphicImageComponent,
    IcePanelPopupComponent],
  providers: [
    HFormService,
  ],
})
export class JsfModule {
}
