package de.uni.frankfurt.database;

import de.uni.frankfurt.json.annotations.JsonSchema;

import java.util.concurrent.ThreadLocalRandom;

public class Passenger {
  private String id;

  @JsonSchema(
      required = true
  )
  private String name;
  private String idCardNumber;

  public Passenger() {
  }

  public Passenger(String name, String idCardNumber) {
    this.id = String.valueOf(
        ThreadLocalRandom.current().nextInt(0, 100000000 + 1));
    this.name = name;
    this.idCardNumber = idCardNumber;
  }

  public String getId() {
    return id;
  }

  public String getIdCardNumber() {
    return idCardNumber;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }
}
