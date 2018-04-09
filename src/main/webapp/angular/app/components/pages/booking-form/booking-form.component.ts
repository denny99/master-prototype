import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {IntegerPipe} from '../../../converter/integer-pipe';
import Flight from '../../../entity/Flight';
import {ConversationService, HInputTextComponent, JsfInput, ValidationResponse} from 'angular-jsf-components';
import {AjaxService} from '../../../services/ajax.service';

declare let $: any;

@Component({
    selector: 'app-booking-form',
    templateUrl: './booking-form.component.html',
    styleUrls: ['./booking-form.component.css'],
})
export class BookingFormComponent implements AfterViewInit {
    private integerConverter = new IntegerPipe();
    // it is not possible to annotate this properly with the jqueryui types
    private slider: any;

    @ViewChild('passengerCountOutput')
    private passengerCountOutput: HInputTextComponent;

    constructor(private ajaxService: AjaxService,
                private router: Router,
                private conversationService: ConversationService) {
        if (!this.conversationService.isActive()) {
            console.error('attempted to visit site without selecting a flight');
            router.navigateByUrl('pages/flightOverview').then().catch((e) => {
                console.error(e);
            });
        }

        // this function is used inside of the input field
        this.validatePassengerCount = this.validatePassengerCount.bind(this);
    }

    get passengerCount(): number {
        return this.conversationService.conversation.getProperty(
            'passengerCount') || 1;
    }

    set passengerCount(val: number) {
        this.conversationService.conversation.setProperty(
            'passengerCount', val);
    }

    get maxPassengers(): number {
        return this.selectedFlight.aircraft.passengerCount;
    }

    get travelInsurance(): boolean {
        return this.conversationService.conversation.getProperty(
            'travelInsurance') || false;
    }

    set travelInsurance(val: boolean) {
        this.conversationService.conversation.setProperty(
            'travelInsurance', val);
    }

    get selectedFlight(): Flight {
        return this.conversationService.conversation.getProperty(
            'selectedFlight');
    }

    ngAfterViewInit() {
        this.slider = $('#passengerCountSlider').slider({
            max: this.maxPassengers,
            value: this.passengerCount,
            change: (event, ui) => {
                this.passengerCount = ui.value;
            },
        });
    }

    async updateSlider(): Promise<void> {
        const currentValue = this.passengerCount;
        const maxValue = this.maxPassengers;
        const minValue = 1;
        if (minValue <= currentValue && currentValue <= maxValue) {
            // to avoid a loop only change when changed through direct input
            this.slider.slider('value', currentValue);
            try {
                await this.passengerCountOutput.validate();
            } catch (e) {
                console.error(e);
            }
        }
    }

    /**
     * validates the entered amount of passengers
     * @param {JsfInput} element
     * @returns {Promise<ValidationResponse>}
     */
    async validatePassengerCount(element: JsfInput): Promise<ValidationResponse> {
        // input validates itself after init, so ref is not set use 1 as default value
        return this.ajaxService.validatePassengerCount(
            this.selectedFlight, element.value);
    }

    async createPassengers(): Promise<void> {
        try {
            // save date in conversation
            this.conversationService.conversation.setProperty('passengerCount',
                this.passengerCount);
            this.conversationService.conversation.setProperty('travelInsurance',
                this.travelInsurance);
            await this.router.navigateByUrl('pages/passengerForm');
        } catch (e) {
            console.error(e);
        }
    }

    async cancelBooking() {
        try {
            // save date in conversation
            this.conversationService.endConversation();
            await this.router.navigateByUrl('pages/flightOverview');
        } catch (e) {
            console.error(e);
        }
    }
}
