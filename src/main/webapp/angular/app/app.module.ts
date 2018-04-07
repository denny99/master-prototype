import {registerLocaleData} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import localeDe from '@angular/common/locales/de';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {CCFlightDetailsComponent} from './components/cc/cc-flight-details/cc-flight-details.component';
import {VersionAnnotationComponent} from './components/includes/version-annotation/version-annotation.component';
import {BookingDetailsComponent} from './components/pages/booking-details/booking-details.component';
import {BookingFormComponent} from './components/pages/booking-form/booking-form.component';
import {BookingSuccessComponent} from './components/pages/booking-success/booking-success.component';
import {FlightDetailsComponent} from './components/pages/flight-details/flight-details.component';
import {FlightOverviewComponent} from './components/pages/flight-overview/flight-overview.component';
import {IndexComponent} from './components/pages/index/index.component';
import {PassengerFormComponent} from './components/pages/passenger-form/passenger-form.component';
import {JsfModule} from './jsf/jsf.module';
import {ConversationService} from './jsf/services/conversation.service';
import {AjaxService} from './services/ajax.service';
import {BookingService} from './services/booking.service';
import {FlightService} from './services/flight.service';
import {PassengerService} from './services/passenger.service';
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
    ConversationService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
