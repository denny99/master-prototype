import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {JsfModule} from './jsf/jsf.module';
import {FormsModule} from '@angular/forms';
import {FlightService} from './services/flight.service';
import {AppRoutingModule} from './app-routing.module';
import {FlightOverviewComponent} from './components/pages/flight-overview/flight-overview.component';
import {IndexComponent} from './components/pages/index/index.component';
import {HttpClientModule} from '@angular/common/http';
import {PassengerService} from './services/passenger.service';
import {AjaxService} from './services/ajax.service';
import {BookingService} from './services/booking.service';
import {VersionAnnotationComponent} from './components/pages/includes/version-annotation/version-annotation.component';
import {FlightColumn1Component} from './components/jsf/flight-column-1/flight-column-1.component';
import {FlightColumn2Component} from './components/jsf/flight-column-2/flight-column-2.component';
import {FlightColumn3Component} from './components/jsf/flight-column-3/flight-column-3.component';
import {FlightColumn4Component} from './components/jsf/flight-column-4/flight-column-4.component';

@NgModule({
  declarations: [
    AppComponent,
    VersionAnnotationComponent,
    FlightOverviewComponent,
    IndexComponent,
    FlightColumn1Component,
    FlightColumn2Component,
    FlightColumn3Component,
    FlightColumn4Component,
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
