import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {JsfModule} from './jsf-components/jsf.module';
import {FormsModule} from '@angular/forms';
import {FlightService} from './services/FlightService';
import {AppRoutingModule} from './app-routing.module';
import {FlightOverviewComponent} from './pages/flight-overview/flight-overview.component';
import {IndexComponent} from './pages/index/index.component';
import {HttpClientModule} from '@angular/common/http';
import {PassengerService} from './services/PassengerService';
import {AjaxService} from './services/AjaxService';
import BookingService from './services/BookingService';

@NgModule({
  declarations: [
    AppComponent,
    FlightOverviewComponent,
    IndexComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    JsfModule,
    AppRoutingModule,
  ],
  providers: [
    FlightService,
    PassengerService,
    AjaxService,
    BookingService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
