import {Injectable} from '@angular/core';
import Flight from '../entity/Flight';
import FlightSearchResponse from '../entity/FlightSearchResponse';

@Injectable()
export class SessionDataService {
  public selectedFlight: Flight;
  public searched = false;
  public arrivalFilter = '';
  public sortOrder = '';
  public flights = new FlightSearchResponse({});

  constructor() {
  }

}
