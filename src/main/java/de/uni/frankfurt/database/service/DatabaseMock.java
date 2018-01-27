package de.uni.frankfurt.database.service;

import de.uni.frankfurt.database.entity.*;
import de.uni.frankfurt.util.RandomDateGenerator;
import de.uni.frankfurt.util.ThreadLocalRandom;
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
      int costs = ThreadLocalRandom
          .nextInt(50, 400);
      Date dateTime = randomDateGenerator.getDate();
      Flight f = new Flight(this.aircrafts.get(aircraftIndex),
          this.airports.get(departureIndex), this.airports.get(arrivalIndex),
          dateTime, costs);
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

  public void addBooking(Booking b) {
    this.bookings.add(b);
  }

  public void addPassenger(Passenger p1) {
    this.passengers.add(p1);
  }
}
