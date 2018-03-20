import Aircraft from './Aircraft';
import Airport from './Airport';

export default class Flight {
  constructor(json) {
    this.aircraft = new Aircraft(json.aircraft);
    this.departure = new Airport(json.departure);
    this.arrival = new Airport(json.arrival);
    this.id = json.id;
    this.dateTime = new Date(json.dateTime.replace('[UTC]', ''));
    this.costs = json.costs;
  }

  /**
   *
   * @return {boolean}
   */
  foreignTravel() {
    return this.departure.country !== this.arrival.country;
  }
}