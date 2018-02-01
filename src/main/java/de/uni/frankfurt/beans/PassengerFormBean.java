package de.uni.frankfurt.beans;

import de.uni.frankfurt.database.entity.Passenger;
import de.uni.frankfurt.database.service.PassengerService;

import javax.enterprise.context.ConversationScoped;
import javax.faces.component.UIInput;
import javax.faces.event.AjaxBehaviorEvent;
import javax.faces.event.ComponentSystemEvent;
import javax.faces.model.SelectItem;
import javax.inject.Inject;
import javax.inject.Named;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Named
@ConversationScoped
public class PassengerFormBean implements Serializable {
  private Passenger[] passengers;
  private int currentPassengerIndex;
  private Passenger currentPassenger;
  private boolean existingUser;
  private boolean forceEdit;

  @Inject
  private PassengerService passengerService;

  public Passenger getCurrentPassenger() {
    return currentPassenger;
  }

  public boolean isExistingUser() {
    return existingUser;
  }

  public List<SelectItem> getLuggageItems() {
    ArrayList<SelectItem> items = new ArrayList<SelectItem>();
    items.add(new SelectItem(0, "No luggage"));
    items.add(new SelectItem(1, "1 Bag"));
    items.add(new SelectItem(2, "2 Bags"));
    items.add(new SelectItem(3, "3 Bags"));
    return items;
  }

  public void setExistingUser(boolean existingUser) {
    this.existingUser = existingUser;
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

  public boolean isForceEdit() {
    return forceEdit;
  }

  public void setForceEdit(boolean forceEdit) {
    this.forceEdit = forceEdit;
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

  public Object forceEditListener(final AjaxBehaviorEvent event) {
    this.forceEdit = true;
    return null;
  }

  public Object passportIdListener(final AjaxBehaviorEvent event) {
    this.forceEdit = false;
    Passenger p;

    final UIInput input = (UIInput) event.getComponent();
    final String number = (String) input.getValue();
    String id = input.getId();
    if (id.equals("passportNumber")) {
      p = passengerService.getPassengerByPassportNumber(number);
    } else {
      p = passengerService.getPassengerByIdCardNumber(number);
    }

    if (p != null) {
      this.currentPassenger.setBirthDay(p.getBirthDay());
      this.currentPassenger.setFirstName(p.getFirstName());
      this.currentPassenger.setLastName(p.getLastName());
      this.existingUser = true;
    } else {
      this.existingUser = false;
    }
    return null;
  }

  public Object validateForm(
      final ComponentSystemEvent event) {
    // TODO validate some stuff?
    return null;
  }
}
