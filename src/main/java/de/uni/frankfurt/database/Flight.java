package de.uni.frankfurt.database;

import de.uni.frankfurt.util.ThreadLocalRandom;

import java.util.Date;

public class Flight {
  private Aircraft aircraft;
  private Airport departure;
  private Airport arrival;
  private String id;
  private Date dateTime;

  public Flight(
      Aircraft aircraft, Airport departure,
      Airport arrival, Date dateTime) {
    this.id = String.valueOf(
        ThreadLocalRandom.nextInt(0, 100000000 + 1));
    this.aircraft = aircraft;
    this.departure = departure;
    this.arrival = arrival;
    this.dateTime = dateTime;
  }

  public Flight() {
  }

  public Aircraft getAircraft() {
    return aircraft;
  }

  public void setAircraft(Aircraft aircraft) {
    this.aircraft = aircraft;
  }

  public Airport getDeparture() {
    return departure;
  }

  public void setDeparture(Airport departure) {
    this.departure = departure;
  }

  public Airport getArrival() {
    return arrival;
  }

  public void setArrival(Airport arrival) {
    this.arrival = arrival;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public Date getDateTime() {
    return dateTime;
  }

  public void setDateTime(Date dateTime) {
    this.dateTime = dateTime;
  }
}
