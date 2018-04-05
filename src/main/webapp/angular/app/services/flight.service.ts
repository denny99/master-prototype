import {Injectable} from '@angular/core';
import ApiConstants from '../constants/ApiConstants';
import {HttpClient, HttpParams} from '@angular/common/http';
import ApiSearchResponse from '../entity/ApiSearchResponse';
import Flight from '../entity/Flight';
import FlightSearchResponse from '../entity/FlightSearchResponse';

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
   * @param {string} sortOrder
   * @return {Promise<ApiSearchResponse<Flight>>}
   */
  async getFlights(
      city: string, limit: number, offset: number,
      sortOrder: string): Promise<ApiSearchResponse<Flight>> {

    const params = new HttpParams().append('city', city).
        append('limit', limit.toString()).
        append('offset', offset.toString()).
        append('sortOrder', sortOrder);

    const response = await this.http.get<ApiSearchResponse<Flight>>(
        FlightService.URL, {
          params: params,
        }).toPromise();

    // now cast into a proper object
    return new FlightSearchResponse(response);
  }
}
