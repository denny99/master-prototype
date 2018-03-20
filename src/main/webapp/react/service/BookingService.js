import ApiConstants from '../constants/ApiConstants';
import Flight from '../entity/Flight';

export default class BookingService {
  static URL = ApiConstants.BASE_URL + 'flights/{flightId}/bookings';

  /**
   *
   * @param {Flight} flight
   * @param {boolean} insurance
   * @param {boolean} tacAccepted
   * @param {Passenger[]} passengers
   * @return {Promise<void>}
   */
  static async createBooking(flight, insurance, tacAccepted, passengers) {
    // do ajax call
    return new Promise((resolve, reject) => {
      $.post({
        url: BookingService.URL.replace('{flightId}', flight.id),
        contentType: 'application/json',
        data: JSON.stringify({
          insurance: insurance,
          flight: flight,
          tacAccepted: tacAccepted,
          passengers: passengers,
        }),
        error: function(jqXHR, textStatus, errorThrown) {
          reject(errorThrown);
        },
        success: function(data) {
          resolve();
        },
      });
    });
  }
}