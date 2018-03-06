package de.uni.frankfurt.json.request;

import de.uni.frankfurt.json.annotations.JsonField;
import de.uni.frankfurt.json.annotations.JsonObject;

@JsonObject
public class ValidatePassengerCountRequest {
  @JsonField(
      required = true,
      description = "Number of new passenger for flight"
  )
  private Integer passengerCount;

  public ValidatePassengerCountRequest() {
  }

  public ValidatePassengerCountRequest(Integer passengerCount) {
    this.passengerCount = passengerCount;
  }

  public Integer getPassengerCount() {
    return passengerCount;
  }

  public void setPassengerCount(Integer passengerCount) {
    this.passengerCount = passengerCount;
  }
}
