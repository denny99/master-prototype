package de.uni.frankfurt.beans;

import de.uni.frankfurt.database.entity.Passenger;
import de.uni.frankfurt.database.service.PassengerService;

import javax.enterprise.context.ConversationScoped;
import javax.faces.application.FacesMessage;
import javax.faces.component.UIInput;
import javax.faces.context.FacesContext;
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
  private static final String PASSPORT_INPUT_ID = "passengerData:passportNumberInput";
  private static final String ID_CARD_INPUT_ID = "passengerData:idCardNumberInput";
  private final List<SelectItem> items = new ArrayList<SelectItem>();

  private Passenger[] passengers;
  private int currentPassengerIndex;
  private Passenger currentPassenger;
  private boolean existingUser;
  private boolean forceEdit;
  @Inject
  private PassengerService passengerService;
  private boolean passportHelp = false;

  public PassengerFormBean() {
    items.add(new SelectItem(0, "No luggage"));
    items.add(new SelectItem(1, "1 Bag"));
    items.add(new SelectItem(2, "2 Bags"));
    items.add(new SelectItem(3, "3 Bags"));
  }

  public Passenger getCurrentPassenger() {
    return currentPassenger;
  }

  public void setCurrentPassenger(
      Passenger currentPassenger) {
    this.currentPassenger = currentPassenger;
  }

  public boolean getPassportHelp() {
    return this.passportHelp;
  }

  public boolean isExistingUser() {
    return existingUser;
  }

  public void setExistingUser(boolean existingUser) {
    this.existingUser = existingUser;
  }

  public List<SelectItem> getLuggageItems() {
    return items;
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

  /**
   * go back to last passenger
   *
   * @return current page or last page
   */
  public String back() {
    if (currentPassengerIndex == 0) {
      return "/pages/bookingForm";
    }
    this.currentPassengerIndex--;
    this.currentPassenger = this.passengers[currentPassengerIndex];
    return "";
  }

  /**
   * enables inputs for personal data when prefilled
   *
   * @param event ajax event
   * @return nothing
   * @ passengerForm:forceEditButton
   */
  public Object forceEditListener(final AjaxBehaviorEvent event) {
    this.forceEdit = true;
    return null;
  }

  /**
   * inits passenger array
   *
   * @param passengerCount amount of passenger to check in
   */
  public void initPassengers(int passengerCount) {
    this.passengers = new Passenger[passengerCount];
    for (int i = 0; i < passengers.length; i++) {
      passengers[i] = new Passenger();
    }

    this.currentPassengerIndex = 0;
    this.currentPassenger = this.passengers[this.currentPassengerIndex];
  }

  /**
   * goto next passenger;
   *
   * @return next page or current page
   */
  public String next() {
    if (this.currentPassengerIndex + 1 == this.passengers.length) {
      return "/pages/bookingDetails";
    }
    this.currentPassengerIndex++;
    this.currentPassenger = this.passengers[currentPassengerIndex];
    return "";
  }

  /**
   * checks for existing user
   *
   * @param event ajax event
   * @return nothing
   * @ passengerForm:passportNumber/idCardNumber
   */
  public Object passportIdListener(final AjaxBehaviorEvent event) {
    this.forceEdit = false;
    Passenger p;

    final UIInput input = (UIInput) event.getComponent();
    final String number = (String) input.getValue();
    String id = input.getId();
    if (id.equals("passportNumberInput")) {
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

  /**
   * triggers ice popup
   *
   * @param event ajax event
   * @return noting
   * @ passengerForm:helpIcon
   */
  public Object setPassportHelp(final AjaxBehaviorEvent event) {
    this.passportHelp = !this.passportHelp;
    return null;
  }

  /**
   * validates form
   * checks for duplicated passports/ids
   *
   * @param event event
   * @return errorMessage or nothing
   * @ passengerForm:passengerData
   */
  public Object validateForm(
      final ComponentSystemEvent event) {
    int foundIdCards = 0;
    int foundPassports = 0;
    for (Passenger passenger : this.passengers) {
      if (passenger.getPassportNumber() != null && passenger.getPassportNumber()
          .equals(this.currentPassenger.getPassportNumber())) {
        foundPassports++;
      }
      if (passenger.getIdCardNumber() != null && passenger.getIdCardNumber()
          .equals(this.currentPassenger.getIdCardNumber())) {
        foundIdCards++;
      }
    }

    final FacesMessage isAlreadyRegistered = new FacesMessage(
        "This passenger is already registered");
    isAlreadyRegistered.setSeverity(FacesMessage.SEVERITY_ERROR);
    if (foundIdCards > 1) {
      // more than one card with the same number exists
      FacesContext.getCurrentInstance()
          .addMessage(ID_CARD_INPUT_ID, isAlreadyRegistered);
      FacesContext.getCurrentInstance().renderResponse();
    }
    if (foundPassports > 1) {
      // more than one card with the same number exists
      FacesContext.getCurrentInstance()
          .addMessage(PASSPORT_INPUT_ID, isAlreadyRegistered);
      FacesContext.getCurrentInstance().renderResponse();
    }
    return null;
  }
}
