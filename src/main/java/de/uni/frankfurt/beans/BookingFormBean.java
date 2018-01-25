package de.uni.frankfurt.beans;

import javax.enterprise.context.RequestScoped;
import javax.inject.Named;
import java.io.Serializable;

@Named
@RequestScoped
public class BookingFormBean implements Serializable {
  private int passengerCount;
  private boolean travelInsurance;

  public boolean isTravelInsurance() {
    return travelInsurance;
  }

  public void setTravelInsurance(boolean travelInsurance) {
    this.travelInsurance = travelInsurance;
  }

  public int getPassengerCount() {
    return passengerCount;
  }

  public void setPassengerCount(int passengerCount) {
    this.passengerCount = passengerCount;
  }
}
