package de.uni.frankfurt.json.input;

import de.uni.frankfurt.json.annotations.JsonField;
import de.uni.frankfurt.json.annotations.JsonObject;

@JsonObject
public class ValidatePassengerCountInput {
  @JsonField(
      required = true,
      description = "Number of new passenger for flight"
  )
  private Integer passengerCount;

  public Integer getPassengerCount() {
    return passengerCount;
  }

  public void setPassengerCount(Integer passengerCount) {
    this.passengerCount = passengerCount;
  }
}
