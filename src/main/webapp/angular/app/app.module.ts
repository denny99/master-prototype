import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {JsfModule} from './jsf/jsf.module';
import {FormsModule} from '@angular/forms';
import {FlightService} from './services/flight.service';
import {AppRoutingModule} from './app-routing.module';
import {FlightOverviewComponent} from './pages/flight-overview/flight-overview.component';
import {IndexComponent} from './pages/index/index.component';
import {HttpClientModule} from '@angular/common/http';
import {PassengerService} from './services/passenger.service';
import {AjaxService} from './services/ajax.service';
import {BookingService} from './services/booking.service';
import {VersionAnnotationComponent} from './pages/includes/version-annotation/version-annotation.component';

@NgModule({
  declarations: [
    AppComponent,
    VersionAnnotationComponent,
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
