package de.uni.frankfurt.database;

import java.util.ArrayList;
import java.util.concurrent.ThreadLocalRandom;

public class Booking {
  private String id;
  private Flight flight;
  private ArrayList<Passenger> passengers;

  public Booking() {
  }

  public Booking(
      Flight flight,
      ArrayList<Passenger> passengers) {
    this.id = String.valueOf(
        ThreadLocalRandom.current().nextInt(0, 100000000 + 1));
    this.flight = flight;
    this.passengers = passengers;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public Flight getFlight() {
    return flight;
  }

  public void setFlight(Flight flight) {
    this.flight = flight;
  }

  public ArrayList<Passenger> getPassengers() {
    return passengers;
  }

  public void setPassengers(
      ArrayList<Passenger> passengers) {
    this.passengers = passengers;
  }
}
