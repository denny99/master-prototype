import ApiConstants from '../constants/ApiConstants';
import Flight from '../entity/Flight';
import ValidationResponse from '../entity/ValidationResponse';

export default class AjaxService {
  static URL = ApiConstants.BASE_URL + 'ajax/';

  /**
   *
   * @param {Flight} flight
   * @param {number} passengerCount
   * @return {Promise<ValidationResponse>}
   */
  static async validatePassengerCount(flight, passengerCount) {
    // do ajax call
    return new Promise((resolve, reject) => {
      $.get({
        url: AjaxService.URL + `${flight.id}/validatePassengerCount`,
        contentType: 'application/json',
        data: {
          passengerCount: passengerCount,
        },
        error: function(jqXHR, textStatus, errorThrown) {
          reject(errorThrown);
        },
        success: function(data) {
          let json = JSON.parse(data);
          resolve(new ValidationResponse(json.error, json.message));
        },
      });
    });
  }
}