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
import {registerLocaleData} from '@angular/common';
import localeDe from '@angular/common/locales/de';
import {FlightDetailsComponent} from './components/pages/flight-details/flight-details.component';
import {BookingFormComponent} from './components/pages/booking-form/booking-form.component';
import {PassengerFormComponent} from './components/pages/passenger-form/passenger-form.component';
import {BookingDetailsComponent} from './components/pages/booking-details/booking-details.component';
import {BookingSuccessComponent} from './components/pages/booking-success/booking-success.component';
import {CCFlightDetailsComponent} from './components/cc/cc-flight-details/cc-flight-details.component';
import {SessionDataService} from './services/session-data.service';

registerLocaleData(localeDe, 'de-DE');

@NgModule({
  declarations: [
    AppComponent,
    VersionAnnotationComponent,
    FlightOverviewComponent,
    IndexComponent,
    FlightDetailsComponent,
    BookingFormComponent,
    PassengerFormComponent,
    BookingDetailsComponent,
    BookingSuccessComponent,
    CCFlightDetailsComponent,
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
    SessionDataService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
