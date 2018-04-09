import {Component} from '@angular/core';
import {SessionDataService} from '../../../services/session-data.service';

@Component({
    selector: 'app-flight-details',
    templateUrl: './flight-details.component.html',
    styleUrls: ['./flight-details.component.css'],
})
export class FlightDetailsComponent {
    constructor(private sessionService: SessionDataService) {
    }
}
