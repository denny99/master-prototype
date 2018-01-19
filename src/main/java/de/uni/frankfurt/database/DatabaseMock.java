package de.uni.frankfurt.database;

import de.uni.frankfurt.exceptions.ResourceNotFoundException;
import org.apache.log4j.Logger;

import javax.enterprise.context.SessionScoped;
import javax.inject.Named;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;

/**
 *
 */
@Named
@SessionScoped
public class DatabaseMock implements Serializable {
  private static final Logger LOG = Logger.getLogger(DatabaseMock.class);

  private Aircraft ac1 = new Aircraft("1", "Boeing 747", "MKA", 240);
  private Aircraft ac2 = new Aircraft("2", "Boeing 777", "GDS", 440);
  private Aircraft ac3 = new Aircraft("3", "Airbus A320", "LGR", 210);

  private Airport a1 = new Airport("EDDF", "Frankfurt Airport", "DE",
      "Frankfurt");
  private Airport a2 = new Airport("EDDB", "Berlin Schönefeld", "DE",
      "Berlin");

  private Flight f1 = new Flight(ac1, a1, a2, "1", new Date());
  private Flight f2 = new Flight(ac2, a1, a2, "1", new Date());

  private ArrayList<Aircraft> aircrafts = new ArrayList<>();
  private ArrayList<Airport> airports = new ArrayList<>();
  private ArrayList<Flight> flights = new ArrayList<>();
  private ArrayList<Passenger> passengers = new ArrayList<>();
  private ArrayList<Booking> bookings = new ArrayList<>();


  public DatabaseMock() {
    // TODO setup initial data
    LOG.info("constructing aircrafts");
    this.aircrafts.add(ac1);
    this.aircrafts.add(ac2);
    this.aircrafts.add(ac3);

    LOG.info("constructing airports");
    this.airports.add(a1);
    this.airports.add(a2);

    LOG.info("constructing flights");
    this.flights.add(f1);
    this.flights.add(f2);
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
    ArrayList<Passenger> result = new ArrayList<>();
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
    ArrayList<Passenger> passengers = new ArrayList<>();
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
   * @param country Target Country
   * @param city    Target City
   * @param date    min. Date for flight
   * @return found results
   */
  public ArrayList<Flight> searchFlight(
      String country, String city, Date date) {
    ArrayList<Flight> results = new ArrayList<>();
    for (Flight flight : flights) {
      if (flight.getArrival().matchesCountry(country) &&
          flight.getArrival().matchesCity(city) &&
          flight.getDateTime().after(date)) {
        results.add(flight);
      }
    }
    return results;

  }
}
