import ApiSearchResponse from './ApiSearchResponse';
import Flight from './Flight';

export default class FlightSearchResponse extends ApiSearchResponse<Flight> {
  /**
   *
   * @param {object} json
   */
  constructor(json: any) {
    super(json.offset, json.limit, json.maxResults, json.data);

    this.data = this.data.map((flightJson) => {
      return new Flight(flightJson);
    });
  }
}