package de.uni.frankfurt.database.entity;

import de.uni.frankfurt.json.annotations.JsonField;
import de.uni.frankfurt.json.annotations.JsonObject;
import de.uni.frankfurt.util.ThreadLocalRandom;

import java.util.Date;

@JsonObject
public class Flight {
  @JsonField(
      required = true
  )
  private Aircraft aircraft;
  @JsonField(
      required = true
  )
  private Airport departure;
  @JsonField(
      required = true
  )
  private Airport arrival;
  @JsonField(
      required = true,
      maxLength = 16,
      readOnly = true
  )
  private String id;
  @JsonField(
      required = true
  )
  private Date dateTime;
  @JsonField(
      required = true
  )
  private Integer costs;

  public Flight(
      Aircraft aircraft, Airport departure,
      Airport arrival, Date dateTime, Integer costs) {
    this.id = String.valueOf(
        ThreadLocalRandom.nextInt(0, 100000000 + 1));
    this.aircraft = aircraft;
    this.departure = departure;
    this.arrival = arrival;
    this.dateTime = dateTime;
    this.costs = costs;
  }

  public Flight() {
  }


  public Aircraft getAircraft() {
    return aircraft;
  }

  public void setAircraft(Aircraft aircraft) {
    this.aircraft = aircraft;
  }

  public Integer getCosts() {
    return costs;
  }

  public void setCosts(Integer costs) {
    this.costs = costs;
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

  public boolean foreignTravel() {
    return !this.departure.getCountry().equals(this.arrival.getCountry());
  }
}
