package de.uni.frankfurt.beans;

import de.uni.frankfurt.database.entity.Flight;
import de.uni.frankfurt.database.service.BookingService;

import javax.enterprise.context.RequestScoped;
import javax.faces.application.FacesMessage;
import javax.faces.component.UIComponent;
import javax.faces.component.UIInput;
import javax.faces.context.FacesContext;
import javax.faces.event.AjaxBehaviorEvent;
import javax.inject.Inject;
import javax.inject.Named;
import java.io.Serializable;

@Named
@RequestScoped
public class BookingFormBean implements Serializable {
  private int passengerCount = 1;
  private boolean travelInsurance;
  private Flight selectedFlight;
  @Inject
  private BookingService bookingService;
  private Integer flightCosts;
  private Integer maxPassengers;

  public boolean isTravelInsurance() {
    return travelInsurance;
  }

  public Integer getFlightCosts() {
    return flightCosts;
  }

  public Integer getMaxPassengers() {
    return maxPassengers;
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

  public void setSelectedFlight(Flight selectedFlight) {
    this.selectedFlight = selectedFlight;
    this.maxPassengers = bookingService.getFreeSeats(selectedFlight);
  }

  public Object costsListener(final AjaxBehaviorEvent event) {
    final UIInput input = (UIInput) event.getComponent();
    final Integer count = (Integer) input.getValue();
    flightCosts = count * selectedFlight.getCosts();
    // TODO update costs text
    return null;
  }

  public void validatePassengerCount(
      final FacesContext fc, final UIComponent component, final Object value) {
    if (value != null) {
      final Integer passengerCount = (Integer) value;
      if (!bookingService.canCheckIn(passengerCount)) {
        ((UIInput) component).setValid(false);
        final String msg = String.format("Max %s free seats on the aircraft",
            10);
        fc.addMessage(component.getClientId(fc), new FacesMessage(msg));
      }
    }
  }
}
