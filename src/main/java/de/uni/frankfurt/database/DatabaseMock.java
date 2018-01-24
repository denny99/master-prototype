package de.uni.frankfurt.database;

import de.uni.frankfurt.exceptions.ResourceNotFoundException;
import de.uni.frankfurt.util.RandomDateGenerator;
import de.uni.frankfurt.util.ThreadLocalRandom;
import org.apache.log4j.Logger;

import javax.enterprise.context.SessionScoped;
import javax.inject.Named;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 *
 */
@Named
@SessionScoped
public class DatabaseMock implements Serializable {
  private static final Logger LOG = Logger.getLogger(DatabaseMock.class);

  private static Airport a1 = new Airport("EDDF", "Frankfurt Airport", "DE",
      "Frankfurt");
  private static Airport a2 = new Airport("EDDB", "Berlin Schönefeld", "DE",
      "Berlin");
  private static Airport a3 = new Airport("EDAH", "Heringsdorf", "DE",
      "Heringsdorf");
  private static Airport a4 = new Airport("EDDW", "Bremen", "DE", "Bremen");
  private static Airport a5 = new Airport("EDDH", "Hamburg", "DE", "Hamburg");
  private static Airport a6 = new Airport("EDDP", "Leipzig/Halle", "DE",
      "Leipzig");
  private static Airport a7 = new Airport("EDDM", "München", "DE", "München");
  private static Airport a8 = new Airport("EDDR", "Saarbrücken", "DE",
      "Saarbrücken");
  private static Airport a9 = new Airport("EDFH", "Frankfurt Hahn", "DE",
      "Hahn");
  private static Airport a10 = new Airport("EDDL", "Düsseldorf", "DE",
      "Düsseldorf");
  private RandomDateGenerator randomDateGenerator = new RandomDateGenerator();

  private ArrayList<Aircraft> aircrafts = new ArrayList<Aircraft>();
  private ArrayList<Airport> airports = new ArrayList<Airport>();
  private ArrayList<Flight> flights = new ArrayList<Flight>();
  private ArrayList<Passenger> passengers = new ArrayList<Passenger>();
  private ArrayList<Booking> bookings = new ArrayList<Booking>();


  public DatabaseMock() {
    // TODO setup initial data
    LOG.info("constructing aircrafts");
    for (int i = 0; i < 100; i++) {
      String manufacturer = ThreadLocalRandom.nextInt(0, 1 + 1) == 0 ?
          "Boeing " :
          "Airbus ";

      Aircraft a = new Aircraft(
          manufacturer + ThreadLocalRandom.nextInt(200, 801),
          String.valueOf(
              ThreadLocalRandom.nextInt(1000000, 10000000)),
          ThreadLocalRandom.nextInt(100, 301));
      this.aircrafts.add(a);
    }

    LOG.info("constructing airports");
    this.airports.add(a1);
    this.airports.add(a2);
    this.airports.add(a3);
    this.airports.add(a4);
    this.airports.add(a5);
    this.airports.add(a6);
    this.airports.add(a7);
    this.airports.add(a8);
    this.airports.add(a9);
    this.airports.add(a10);

    LOG.info("constructing flights");
    for (int i = 0; i < 10000; i++) {
      int departureIndex = ThreadLocalRandom
          .nextInt(0, this.airports.size());
      int arrivalIndex = ThreadLocalRandom
          .nextInt(0, this.airports.size());
      int aircraftIndex = ThreadLocalRandom
          .nextInt(0, this.aircrafts.size());
      Date dateTime = randomDateGenerator.getDate();
      Flight f = new Flight(this.aircrafts.get(aircraftIndex),
          this.airports.get(departureIndex), this.airports.get(arrivalIndex),
          dateTime);
      this.flights.add(f);
    }
  }

  public ArrayList<Aircraft> getAircrafts() {
    return aircrafts;
  }

  public ArrayList<Passenger> getPassengers() {
    return passengers;
  }

  public ArrayList<Booking> getBookings() {
    return bookings;
  }

  public ArrayList<Flight> getFlights() {
    return flights;
  }

  /**
   * @param booking booking to create
   * @return created booking with correct data
   * @throws ResourceNotFoundException flight not found
   */
  public Booking createBooking(
      Booking booking) throws ResourceNotFoundException {
    Flight f = this.getFlightById(booking.getFlight().getId());
    Booking b = new Booking(f, this.createPassengers(booking.getPassengers()));
    this.bookings.add(b);
    return b;
  }

  /**
   * @param id id of flight
   * @return Flight
   * @throws ResourceNotFoundException 404 when missing
   */
  public Flight getFlightById(String id) throws ResourceNotFoundException {
    for (Flight flight : this.flights) {
      if (flight.getId().equals(id)) {
        return flight;
      }
    }
    throw new ResourceNotFoundException(id, Flight.class);
  }

  /**
   * @param passengers passengers to create
   * @return created objects
   */
  public ArrayList<Passenger> createPassengers(
      ArrayList<Passenger> passengers) {
    // force random id
    ArrayList<Passenger> result = new ArrayList<Passenger>();
    for (Passenger p : passengers) {
      result.add(this.createPassenger(p));
    }
    return result;
  }

  /**
   * @param p passenger to create
   * @return created object
   */
  public Passenger createPassenger(Passenger p) {
    // force random id
    Passenger p1 = new Passenger(p.getName(), p.getIdCardNumber());
    this.passengers.add(p1);
    return p1;
  }

  /**
   * @param id id of booking
   * @return found booking
   * @throws ResourceNotFoundException id does not exist
   */
  public Booking getBookingById(String id) throws ResourceNotFoundException {
    for (Booking booking : this.bookings) {
      if (booking.getId().equals(id)) {
        return booking;
      }
    }
    throw new ResourceNotFoundException(id, Booking.class);
  }

  /**
   * @param id id of passenger
   * @return found passenger
   * @throws ResourceNotFoundException id does not exist
   */
  public Passenger getPassengerById(
      String id) throws ResourceNotFoundException {
    for (Passenger passenger : this.passengers) {
      if (passenger.getId().equals(id)) {
        return passenger;
      }
    }
    throw new ResourceNotFoundException(id, Passenger.class);
  }

  /**
   * @param id id card number
   * @return returns a list of all passenger containing the given number (autocomplete)
   */
  public ArrayList<Passenger> getPassengersByIdCardNumber(
      String id) {
    ArrayList<Passenger> passengers = new ArrayList<Passenger>();
    for (Passenger passenger : this.passengers) {
      if (passenger.getIdCardNumber()
          .toLowerCase()
          .contains(id.toLowerCase())) {
        passengers.add(passenger);
      }
    }
    return passengers;
  }

  /**
   * @param limit   max number of results
   * @param offset  number of results to skip
   * @param country Target Country
   * @param city    Target City
   * @param date    min. Date for flight
   * @return found results
   */
  public List<Flight> searchFlight(
      int limit, int offset, String country, String city, Date date) {
    ArrayList<Flight> results = new ArrayList<Flight>();
    for (Flight flight : flights) {
      if (flight.getArrival().matchesCountry(country) &&
          flight.getArrival().matchesCity(city) &&
          flight.getDateTime().after(date)) {
        results.add(flight);
      }
    }
    if (results.size() > limit) {
      return results.subList(offset, offset + limit);
    } else {
      return results;
    }
  }
}
