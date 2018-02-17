package de.uni.frankfurt.database.entity;

import de.uni.frankfurt.json.annotations.JsonField;
import de.uni.frankfurt.json.annotations.JsonObject;
import de.uni.frankfurt.util.ThreadLocalRandom;

@JsonObject(
    example = "{\n" +
        "\"id\": \"35738048\",\n" +
        "\"model\": \"Airbus 606\",\n" +
        "\"name\": \"2342041\",\n" +
        "\"passengerCount\": 294\n" +
        "}"
)
public class Aircraft {
  @JsonField(
      required = true,
      readOnly = true
  )
  private String id;
  @JsonField(
      required = true,
      maxLength = 16
  )
  private String model;
  @JsonField(
      required = true,
      maxLength = 16
  )
  private String name;
  @JsonField(
      required = true,
      maximum = 450
  )
  private Integer passengerCount;

  public Aircraft(String model, String name, Integer passengerCount) {
    this.id = String.valueOf(
        ThreadLocalRandom.nextInt(0, 100000000 + 1));
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
