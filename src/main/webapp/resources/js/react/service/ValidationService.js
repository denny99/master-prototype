import ApiConstants from '../constants/ApiConstants';
import Flight from '../entity/Flight';

export default class FlightService {
  static URL = ApiConstants.BASE_URL + 'validations/';

  /**
   *
   * @param {string} city
   * @param {number} limit
   * @param {number} offset
   * @param {'asc' | 'desc'} sortOrder
   * @return {Promise<object[]>}
   */
  static async getFlights(city, limit, offset, sortOrder) {
    // do ajax call
    return new Promise((resolve, reject) => {
      $.get({
        url: FlightService.URL,
        data: {
          city: city,
          limit: limit,
          offset: offset,
          sortOrder: sortOrder,
        },
        error: function(jqXHR, textStatus, errorThrown) {
          reject(errorThrown);
        },
        success: function(data) {
          resolve(data.map((obj) => {
            return new Flight(obj);
          }));
        },
      });
    });
  }
}