package de.uni.frankfurt.beans;

import de.uni.frankfurt.database.entity.Passenger;

import javax.enterprise.context.ConversationScoped;
import javax.faces.event.ComponentSystemEvent;
import javax.inject.Named;
import java.io.Serializable;

@Named
@ConversationScoped
public class PassengerFormBean implements Serializable {
  private Passenger[] passengers;
  private int currentPassengerIndex;
  private Passenger currentPassenger;

  public Passenger getCurrentPassenger() {
    return currentPassenger;
  }

  public void setCurrentPassenger(
      Passenger currentPassenger) {
    this.currentPassenger = currentPassenger;
  }

  public Passenger[] getPassengers() {
    return passengers;
  }

  public void setPassengers(Passenger[] passengers) {
    this.passengers = passengers;
  }

  public int getCurrentPassengerIndex() {
    return currentPassengerIndex;
  }

  public void setCurrentPassengerIndex(int currentPassengerIndex) {
    this.currentPassengerIndex = currentPassengerIndex;
  }

  public String back() {
    if (currentPassengerIndex == 0) {
      return "/pages/bookingForm";
    }
    this.currentPassengerIndex--;
    this.currentPassenger = this.passengers[currentPassengerIndex];
    return "";
  }

  public void initPassengers(int passengerCount) {
    this.passengers = new Passenger[passengerCount];
    for (int i = 0; i < passengers.length; i++) {
      passengers[i] = new Passenger();
    }

    this.currentPassengerIndex = 0;
    this.currentPassenger = this.passengers[this.currentPassengerIndex];
  }

  public String next() {
    this.currentPassengerIndex++;
    if (this.currentPassengerIndex == this.passengers.length) {
      return "/pages/bookingDetails";
    }
    this.currentPassenger = this.passengers[currentPassengerIndex];
    return "";
  }

  public Object validateForm(
      final ComponentSystemEvent event) {
    return null;
  }
}
