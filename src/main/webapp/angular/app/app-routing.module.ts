import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FlightOverviewComponent} from './components/pages/flight-overview/flight-overview.component';
import {IndexComponent} from './components/pages/index/index.component';

const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'pages/flightOverview', component: FlightOverviewComponent},
];

@NgModule({
  exports: [
    RouterModule,
  ],
  imports: [RouterModule.forRoot(routes, {useHash: true})],
})
export class AppRoutingModule {
}
