import ApiConstants from '../constants/ApiConstants';
import Flight from '../entity/Flight';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import Passenger from '../entity/Passenger';
import Booking from '../entity/Booking';

@Injectable()
export class BookingService {
  static URL = ApiConstants.BASE_URL + 'flights/{flightId}/bookings';

  constructor(private http: HttpClient) {
  }

  /**
   *
   * @param {Flight} flight
   * @param {boolean} insurance
   * @param {boolean} tacAccepted
   * @param {Passenger[]} passengers
   * @return {Promise<Booking>}
   */
  async createBooking(
      flight: Flight, insurance: boolean, tacAccepted: boolean,
      passengers: Array<Passenger>): Promise<Booking> {

    // correct object cast is required, flight needs to be an correct object (date), but the booking object is not used in the prototype
    return this.http.post<Booking>(
        BookingService.URL.replace('{flightId}', flight.id), {
          insurance: insurance,
          flight: flight,
          tacAccepted: tacAccepted,
          passengers: passengers,
        }).toPromise();
  }
}
