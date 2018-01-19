package de.uni.frankfurt.database;

public class Aircraft {
  private String id;
  private String model;
  private String name;
  private Integer passengerCount;

  public Aircraft(
      String id, String model, String name, Integer passengerCount) {
    this.id = id;
    this.model = model;
    this.name = name;
    this.passengerCount = passengerCount;
  }

  public Aircraft() {
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getModel() {
    return model;
  }

  public void setModel(String model) {
    this.model = model;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Integer getPassengerCount() {
    return passengerCount;
  }

  public void setPassengerCount(Integer passengerCount) {
    this.passengerCount = passengerCount;
  }
}
