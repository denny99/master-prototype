package de.uni.frankfurt.database.entity;

import de.uni.frankfurt.util.ThreadLocalRandom;

import java.util.ArrayList;

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
        ThreadLocalRandom.nextInt(0, 100000000 + 1));
    this.flight = flight;
    this.passengers = passengers;
  }

  public String getId() {
    return id;
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
