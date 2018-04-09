import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {LongDatePipe} from '../../../converter/long-date-pipe';
import {ApiSearchResponse, ConversationService, SelectItem} from 'angular-jsf-components';
import Flight from '../../../entity/Flight';
import {FlightService} from '../../../services/flight.service';
import {SessionDataService} from '../../../services/session-data.service';

@Component({
    selector: 'app-flight-overview',
    templateUrl: './flight-overview.component.html',
    styleUrls: ['./flight-overview.component.css'],
})
export class FlightOverviewComponent {
    private PAGE_SIZE = 10;
    private sortOptions: Array<SelectItem> = [];
    private dateConverter = new LongDatePipe('de-DE');

    constructor(private flightService: FlightService, private router: Router,
                private sessionService: SessionDataService,
                private conversationService: ConversationService) {
        this.sortOptions.push(new SelectItem('asc', 'Ascending'));
        this.sortOptions.push(new SelectItem('desc', 'Descending'));

        this.searchFlight = this.searchFlight.bind(this);
    }

    get flights(): ApiSearchResponse<Flight> {
        return this.sessionService.flights;
    }

    set flights(flights: ApiSearchResponse<Flight>) {
        this.sessionService.flights = flights;
    }

    get sortOrder(): string {
        return this.sessionService.sortOrder;
    }

    set sortOrder(val: string) {
        this.sessionService.sortOrder = val;
    }

    get arrivalFilter(): string {
        return this.sessionService.arrivalFilter;
    }

    set arrivalFilter(val: string) {
        this.sessionService.arrivalFilter = val;
    }

    get searched(): boolean {
        return this.sessionService.searched;
    }

    set searched(val: boolean) {
        this.sessionService.searched = val;
    }

    async searchFlight(page: number): Promise<void> {
        try {
            this.flights = await this.flightService.getFlights(this.arrivalFilter,
                this.PAGE_SIZE,
                (page - 1) * this.PAGE_SIZE, this.sortOrder);
            this.searched = true;
        } catch (e) {
            console.error(e);
        }
    }

    async viewFlight(flight: Flight) {
        try {
            this.sessionService.selectedFlight = flight;
            await this.router.navigateByUrl('/pages/flightDetails');
        } catch (e) {
            console.error(e);
        }
    }

    async startBooking(flight: Flight) {
        try {
            this.conversationService.beginConversation();
            this.conversationService.conversation.setProperty('selectedFlight',
                flight);
            await this.router.navigateByUrl('/pages/bookingForm');
        } catch (e) {
            console.error(e);
        }
    }
}
