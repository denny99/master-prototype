import ApiConstants from '../constants/ApiConstants';
import Flight from '../entity/Flight';
import ValidationResponse from '../entity/ValidationResponse';

export default class ValidationService {
  static URL = ApiConstants.BASE_URL + 'validations/';

  /**
   *
   * @param {Flight} flight
   * @param {number} passengerCount
   * @return {Promise<ValidationResponse>}
   */
  static async validatePassengerCount(flight, passengerCount) {
    // do ajax call
    return new Promise((resolve, reject) => {
      $.post({
        url: ValidationService.URL + `${flight.id}/validatePassengerCount`,
        data: {
          passengerCount: passengerCount,
        },
        error: function(jqXHR, textStatus, errorThrown) {
          reject(errorThrown);
        },
        success: function(data) {
          resolve(new ValidationResponse(data.error, data.message));
        },
      });
    });
  }
}