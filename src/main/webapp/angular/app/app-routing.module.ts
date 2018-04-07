import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BookingFormComponent} from './components/pages/booking-form/booking-form.component';
import {FlightDetailsComponent} from './components/pages/flight-details/flight-details.component';
import {FlightOverviewComponent} from './components/pages/flight-overview/flight-overview.component';
import {IndexComponent} from './components/pages/index/index.component';

const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'index', component: IndexComponent},
  {path: 'pages/flightOverview', component: FlightOverviewComponent},
  {path: 'pages/flightDetails', component: FlightDetailsComponent},
  {path: 'pages/bookingForm', component: BookingFormComponent},
];

@NgModule({
  exports: [
    RouterModule,
  ],
  imports: [RouterModule.forRoot(routes, {useHash: true})],
})
export class AppRoutingModule {
}
