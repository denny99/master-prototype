import ApiConstants from '../constants/ApiConstants';
import Passenger from '../entity/Passenger';

export default class PassengerService {
  static URL = ApiConstants.BASE_URL + 'passengers/';

  /**
   *
   * @param {string} passportNumber
   * @param {string} idCardNumber
   * @return {Promise<Passenger[]>}
   */
  static async getPassengers(passportNumber, idCardNumber) {
    // do ajax call
    return new Promise((resolve, reject) => {
      $.get({
        url: PassengerService.URL,
        contentType: 'application/json',
        data: {
          passportNumber: passportNumber,
          idCardNumber: idCardNumber,
        },
        error: function(jqXHR, textStatus, errorThrown) {
          reject(errorThrown);
        },
        success: function(data) {
          if (data[0] === null) {
            return resolve();
          }
          resolve(data.map((obj) => {
            return new Passenger(obj);
          }));
        },
      });
    });
  }
}