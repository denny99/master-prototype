import ApiConstants from '../constants/ApiConstants';
import Flight from '../entity/Flight';
import ValidationResponse from '../entity/ValidationResponse';
import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export class AjaxService {
  static URL = ApiConstants.BASE_URL + 'ajax/';

  constructor(private http: HttpClient) {
  }

  /**
   *
   * @param {Flight} flight
   * @param {number} passengerCount
   * @return {Promise<ValidationResponse>}
   */
  async validatePassengerCount(
      flight: Flight, passengerCount: number): Promise<ValidationResponse> {

    const params = new HttpParams().set('passengerCount',
        passengerCount.toString());

    // do ajax call
    return this.http.get<ValidationResponse>(AjaxService.URL +
        `${flight.id}/validatePassengerCount`, {
      params: params,
    }).toPromise();
  }
}
