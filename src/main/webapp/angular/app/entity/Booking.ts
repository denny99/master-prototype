import Flight from './Flight';
import Passenger from './Passenger';

export default class Booking {
  insurance: boolean;
  id: string;
  flight: Flight;
  tacAccepted: boolean;
  passengers: Array<Passenger>;
}
