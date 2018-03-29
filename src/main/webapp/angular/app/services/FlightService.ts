import {Injectable} from '@angular/core';
import {SortOrder} from '../enums/SortOrder';
import ApiConstants from '../constants/ApiConstants';
import {HttpClient, HttpParams} from '@angular/common/http';
import ApiSearchResponse from '../entity/ApiSearchResponse';
import Flight from '../entity/Flight';

@Injectable()
export class FlightService {
  private static URL = ApiConstants.BASE_URL + 'flights/';

  constructor(private http: HttpClient) {
  }

  /**
   *
   * @param {string} city
   * @param {number} limit
   * @param {number} offset
   * @param {SortOrder} sortOrder
   * @return {Promise<ApiSearchResponse<Flight>>}
   */
  async getFlights(
      city: string, limit: number, offset: number, sortOrder: SortOrder) {

    const params = new HttpParams();

    params.append('city', city);
    params.append('limit', limit.toString());
    params.append('offset', offset.toString());
    params.append('sortOrder', sortOrder);

    return this.http.get<ApiSearchResponse<Flight>>(FlightService.URL, {
      params: params,
    }).toPromise();
  }
}
