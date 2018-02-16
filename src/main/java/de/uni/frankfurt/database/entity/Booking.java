package de.uni.frankfurt.database.entity;

import de.uni.frankfurt.json.annotations.JsonObject;
import de.uni.frankfurt.util.ThreadLocalRandom;

import java.util.ArrayList;

@JsonObject
public class Booking {
  private boolean insurance;
  private String id;
  private Flight flight;
  // new: required for BE validation
  private boolean tacAccepted;
  private ArrayList<Passenger> passengers;

  public Booking() {
  }

  public Booking(
      Flight flight,
      boolean insurance,
      ArrayList<Passenger> passengers) {
    this.id = String.valueOf(
        ThreadLocalRandom.nextInt(0, 100000000 + 1));
    this.flight = flight;
    this.passengers = passengers;
    this.insurance = insurance;
  }

  public boolean isTacAccepted() {
    return tacAccepted;
  }

  public void setTacAccepted(boolean tacAccepted) {
    this.tacAccepted = tacAccepted;
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

  public boolean isInsurance() {
    return insurance;
  }

  public void setInsurance(boolean insurance) {
    this.insurance = insurance;
  }

  public ArrayList<Passenger> getPassengers() {
    return passengers;
  }

  public void setPassengers(
      ArrayList<Passenger> passengers) {
    this.passengers = passengers;
  }
}
