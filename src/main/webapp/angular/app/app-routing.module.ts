import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BookingDetailsComponent} from './components/pages/booking-details/booking-details.component';
import {BookingFormComponent} from './components/pages/booking-form/booking-form.component';
import {BookingSuccessComponent} from './components/pages/booking-success/booking-success.component';
import {FlightDetailsComponent} from './components/pages/flight-details/flight-details.component';
import {FlightOverviewComponent} from './components/pages/flight-overview/flight-overview.component';
import {IndexComponent} from './components/pages/index/index.component';
import {PassengerFormComponent} from './components/pages/passenger-form/passenger-form.component';

const routes: Routes = [
    {path: '', component: IndexComponent},
    {path: 'index', component: IndexComponent},
    {path: 'pages/flightOverview', component: FlightOverviewComponent},
    {path: 'pages/flightDetails', component: FlightDetailsComponent},
    {path: 'pages/bookingForm', component: BookingFormComponent},
    {path: 'pages/passengerForm', component: PassengerFormComponent},
    {path: 'pages/bookingDetails', component: BookingDetailsComponent},
    {path: 'pages/bookingSuccess', component: BookingSuccessComponent},
];

@NgModule({
    exports: [
        RouterModule,
    ],
    imports: [RouterModule.forRoot(routes, {useHash: true})],
})
export class AppRoutingModule {
}
