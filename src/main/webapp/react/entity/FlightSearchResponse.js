import Flight from './Flight';
import ApiResponse from '../jsf/entity/ApiResponse';

export default class FlightSearchResponse extends ApiResponse {
  /**
   *
   * @param {object} json
   */
  constructor(json) {
    super(json.offset, json.limit, json.maxResults, json.data);

    this.data = this.data.map((flightJson) => {
      return new Flight(flightJson);
    });
  }
}