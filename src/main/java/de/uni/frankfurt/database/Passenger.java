package de.uni.frankfurt.database;

import de.uni.frankfurt.json.annotations.JsonSchema;

import java.util.concurrent.ThreadLocalRandom;

public class Passenger {
  private String id;

  @JsonSchema(
      required = true
  )
  private String name;

  public Passenger() {
  }

  public Passenger(String name) {
    this.id = String.valueOf(
        ThreadLocalRandom.current().nextInt(0, 100000000 + 1));
    this.name = name;
  }

  public String getId() {
    return id;
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
