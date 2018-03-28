import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {JsfModule} from './jsf/jsf.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    JsfModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
