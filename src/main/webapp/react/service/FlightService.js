import ApiConstants from '../constants/ApiConstants';
import FlightSearchResponse from '../entity/FlightSearchResponse';

export default class FlightService {
  static URL = ApiConstants.BASE_URL + 'flights/';

  /**
   *
   * @param {string} city
   * @param {number} limit
   * @param {number} offset
   * @param {'asc' | 'desc'} sortOrder
   * @return {Promise<FlightSearchResponse>}
   */
  static async getFlights(city, limit, offset, sortOrder) {
    // do ajax call
    return new Promise((resolve, reject) => {
      $.get({
        url: FlightService.URL,
        contentType: 'application/json',
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
          resolve(new FlightSearchResponse(data));
        },
      });
    });
  }
}