import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {IntegerPipe} from '../../../converter/integer-pipe';
import {ShortDatePipe} from '../../../converter/short-date-pipe';
import Flight from '../../../entity/Flight';
import Passenger from '../../../entity/Passenger';
import {
    ConversationService, HFormComponent, IAjaxEventParameter, JsfCore, JsfInput, SelectItem,
    ValidationResponse
} from 'angular-jsf-components';
import {PassengerService} from '../../../services/passenger.service';

@Component({
    selector: 'app-passenger-form',
    templateUrl: './passenger-form.component.html',
    styleUrls: ['./passenger-form.component.css'],
})
export class PassengerFormComponent {
    private forceEdit = false;
    private existingUser = false;
    private passportHelp = false;
    private luggageItems: Array<SelectItem> = [];
    private shortDateConverter = new ShortDatePipe('de-DE');
    private integerConverter = new IntegerPipe();
    private toRender: JsfCore;

    constructor(private passengerService: PassengerService,
                private router: Router,
                private conversationService: ConversationService) {
        // setup radio items
        this.luggageItems.push(new SelectItem(0, 'No luggage'));
        this.luggageItems.push(new SelectItem(1, '1 Bag'));
        this.luggageItems.push(new SelectItem(2, '2 Bags'));
        this.luggageItems.push(new SelectItem(3, '3 Bags'));

        if (!this.conversationService.isActive()) {
            console.error('attempted to visit site without selecting a flight');
            router.navigateByUrl('pages/flightOverview').then().catch((e) => {
                console.error(e);
            });
        } else {
            // already passengers in conversation?
            if (!this.conversationService.conversation.hasProperty(
                    'passengers')) {
                this.passengers = [];
                // create empty passengers
                for (let i = 0; i <
                this.conversationService.conversation.getProperty(
                    'passengerCount'); i++) {
                    this.passengers.push(new Passenger());
                }
            }
        }

        this.validateForm = this.validateForm.bind(this);
    }

    get passengers(): Array<Passenger> {
        return this.conversationService.conversation.getProperty(
            'passengers');
    }

    set passengers(val: Array<Passenger>) {
        this.conversationService.conversation.setProperty(
            'passengers', val);
    }

    get currentPassengerIndex(): number {
        return this.conversationService.conversation.getProperty(
            'currentPassengerIndex') || 0;
    }

    set currentPassengerIndex(val: number) {
        this.conversationService.conversation.setProperty(
            'currentPassengerIndex', val);
    }

    get selectedFlight(): Flight {
        return this.conversationService.conversation.getProperty(
            'selectedFlight');
    }

    get currentPassenger(): Passenger {
        return this.passengers[this.currentPassengerIndex];
    }

    set currentPassenger(passenger: Passenger) {
        this.passengers[this.currentPassengerIndex] = passenger;
    }

    async next() {
        if (this.currentPassengerIndex + 1 === this.passengers.length) {
            try {
                return await this.router.navigateByUrl('pages/bookingDetails');
            } catch (e) {
                console.error(e);
            }
        }

        // increase index
        this.currentPassengerIndex++;
        this.forceEdit = false;
        this.existingUser = false;
    }

    async back() {
        // did we trigger back function on next page
        // save current data

        if (this.currentPassengerIndex === 0) {
            try {
                return await this.router.navigateByUrl('pages/bookingForm');
            } catch (e) {
                console.error(e);
            }
        }

        // decrease index
        this.currentPassengerIndex--;
        this.forceEdit = false;
        this.existingUser = false;
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

    toggleForceEdit() {
        this.forceEdit = !this.forceEdit;
    }

    togglePassportHelp() {
        this.passportHelp = !this.passportHelp;
    }

    /**
     *
     * @param {IAjaxEventParameter} input
     */
    async passportIdListener(input: IAjaxEventParameter) {
        try {
            const passengers = await this.passengerService.getPassengers(
                input.exec.simpleId === 'passportNumberInput' ?
                    this.currentPassenger.passportNumber :
                    '',
                input.exec.simpleId === 'idCardNumberInput' ?
                    this.currentPassenger.idCardNumber :
                    '');
            if (passengers && passengers.length !== 0) {
                this.currentPassenger = passengers[0];
                this.forceEdit = false;
                this.existingUser = true;

                // do the timeout trick again, when setting the new passenger the inputs
                // are not directly updated and there is no hook for the current component
                // that registers this change
                setTimeout(
                    async () => {
                        await input.render.jsfOnRender();
                    }, 0);
            }
        } catch (e) {
            console.error(e);
        }
    }

    async validateForm(form: HFormComponent): Promise<ValidationResponse> {
        let affectedInput: JsfInput;

        for (const input of form.inputs.toArray()) {
            if (input.simpleId === 'passportNumberInput' &&
                this.selectedFlight.foreignTravel()) {
                affectedInput = input;
                break;
            } else if (input.simpleId === 'idCardNumberInput') {
                affectedInput = input;
                break;
            }
        }

        let found = 0;
        for (const passenger of this.passengers) {
            if (passenger.idCardNumber === this.currentPassenger.idCardNumber ||
                passenger.passportNumber === this.currentPassenger.passportNumber) {
                found++;
            }
        }

        return new ValidationResponse(found > 1,
            'This passenger is already registered', affectedInput.simpleId);
    }
}
