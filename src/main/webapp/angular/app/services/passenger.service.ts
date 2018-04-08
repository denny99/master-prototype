import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import ApiConstants from '../constants/ApiConstants';
import Passenger from '../entity/Passenger';

@Injectable()
export class PassengerService {
  static URL = ApiConstants.BASE_URL + 'passengers/';

  constructor(private http: HttpClient) {
  }

  /**
   *
   * @param {string} passportNumber
   * @param {string} idCardNumber
   * @return {Promise<Passenger[]>}
   */
  async getPassengers(
      passportNumber: string, idCardNumber: string): Promise<Array<Passenger>> {
    // do ajax call
    const params = new HttpParams().append('passportNumber', passportNumber).
        append('idCardNumber', idCardNumber);

    // correct object cast is not required, the passenger object has no functions or special attr treatment
    const response = await this.http.get<Array<Passenger>>(PassengerService.URL,
        {
          params: params,
        }).toPromise();

    const result: Array<Passenger> = [];
    for (const p of response) {
      if (p !== null) {
        result.push(new Passenger(p));
      }
    }
    return result;
  }
}