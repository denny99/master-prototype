import Aircraft from './Aircraft';
import Airport from './Airport';

export default class Flight {
  aircraft: Aircraft;
  departure: Airport;
  arrival: Airport;
  id: string;
  dateTime: Date;
  costs: number;

  /**
   *
   * @returns {boolean}
   */
  foreignTravel(): boolean {
    return this.departure.country !== this.arrival.country;
  }
}
