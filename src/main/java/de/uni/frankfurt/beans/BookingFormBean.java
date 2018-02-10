package de.uni.frankfurt.beans;

import de.uni.frankfurt.database.entity.Flight;
import de.uni.frankfurt.database.service.BookingService;

import javax.enterprise.context.ConversationScoped;
import javax.faces.application.FacesMessage;
import javax.faces.component.UIComponent;
import javax.faces.component.UIInput;
import javax.faces.context.FacesContext;
import javax.faces.event.AjaxBehaviorEvent;
import javax.inject.Inject;
import javax.inject.Named;
import java.io.Serializable;

@Named
@ConversationScoped
public class BookingFormBean implements Serializable {
  private int passengerCount = 1;
  private boolean travelInsurance;
  private Flight selectedFlight;
  private Integer maxPassengers;
  private Integer flightCosts;

  @Inject
  private BookingService bookingService;

  public boolean isTravelInsurance() {
    return travelInsurance;
  }

  public boolean getTravelInsurance() {
    return travelInsurance;
  }

  public void setTravelInsurance(boolean travelInsurance) {
    this.travelInsurance = travelInsurance;
  }

  public Integer getFlightCosts() {
    return flightCosts;
  }

  public void setFlightCosts(Integer flightCosts) {
    this.flightCosts = flightCosts;
  }

  public Integer getMaxPassengers() {
    return maxPassengers;
  }

  public void setMaxPassengers(Integer maxPassengers) {
    this.maxPassengers = maxPassengers;
  }

  public int getPassengerCount() {
    return passengerCount;
  }

  public void setPassengerCount(int passengerCount) {
    this.passengerCount = passengerCount;
  }

  public Flight getSelectedFlight() {
    return selectedFlight;
  }

  public void setSelectedFlight(Flight selectedFlight) {
    this.selectedFlight = selectedFlight;
    this.flightCosts = selectedFlight.getCosts();
    this.maxPassengers = bookingService.getFreeSeats(selectedFlight);
  }

  /**
   * recalculates costs when changing the input
   *
   * @param event ajax event
   * @return nothing
   * @ bookingForm:passengerCountOutput
   */
  public Object costsListener(final AjaxBehaviorEvent event) {
    final UIInput input = (UIInput) event.getComponent();
    final Integer count = (Integer) input.getValue();
    this.setFlightCosts(count * this.selectedFlight.getCosts());
    return null;
  }

  /**
   * validate max number of passenger for flight
   *
   * @param fc        context
   * @param component affected component
   * @param value     value entered in input
   * @ bookingForm:passengerCountOutput
   */
  public void validatePassengerCount(
      final FacesContext fc, final UIComponent component, final Object value) {
    if (value != null) {
      final Integer passengerCount = (Integer) value;
      if (!this.bookingService.canCheckIn(this.selectedFlight,
          passengerCount)) {
        ((UIInput) component).setValid(false);
        final String msg = String.format("Max %s free seats on the aircraft",
            this.bookingService.getFreeSeats(this.selectedFlight));
        fc.addMessage(component.getClientId(fc), new FacesMessage(msg));
      }
    }
  }
}
