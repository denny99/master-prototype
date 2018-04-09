import Aircraft from './Aircraft';
import Airport from './Airport';

export default class Flight {
    aircraft: Aircraft;
    departure: Airport;
    arrival: Airport;
    id: string;
    dateTime: Date;
    costs: number;

    constructor(json: any) {
        this.aircraft = new Aircraft(json.aircraft);
        this.departure = new Airport(json.departure);
        this.arrival = new Airport(json.arrival);
        this.id = json.id;
        this.dateTime = new Date(json.dateTime.replace('[UTC]', ''));
        this.costs = json.costs;
    }

    /**
     *
     * @returns {boolean}
     */
    foreignTravel(): boolean {
        return this.departure.country !== this.arrival.country;
    }
}
