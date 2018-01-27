package de.uni.frankfurt.beans;

import de.uni.frankfurt.database.entity.Passenger;

import javax.enterprise.context.RequestScoped;
import javax.faces.event.ComponentSystemEvent;
import javax.inject.Named;

@Named
@RequestScoped
public class PassengerFormBean {
  private Passenger[] passengers;
  private int currentPassenger;

  public Passenger[] getPassengers() {
    return passengers;
  }

  public void setPassengers(Passenger[] passengers) {
    this.passengers = passengers;
  }

  public int getCurrentPassenger() {
    return currentPassenger;
  }

  public void setCurrentPassenger(int currentPassenger) {
    this.currentPassenger = currentPassenger;
  }

  public String back() {
    if (currentPassenger == 0) {
      return "page/bookingForm";
    }
    currentPassenger--;
    return "";
  }

  public void initPassengers(int passengerCount) {
    this.passengers = new Passenger[passengerCount];
    this.currentPassenger = 0;
  }

  public String next() {
    currentPassenger++;
    if (currentPassenger == this.passengers.length) {
      return "/pages/bookingDetails";
    }
    return "";
  }

  public Object validateForm(
      final ComponentSystemEvent event) {
    return null;
  }
}
