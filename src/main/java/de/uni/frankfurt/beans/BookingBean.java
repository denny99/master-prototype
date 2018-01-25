package de.uni.frankfurt.beans;

import de.uni.frankfurt.database.Flight;

import javax.enterprise.context.Conversation;
import javax.enterprise.context.ConversationScoped;
import javax.inject.Inject;
import javax.inject.Named;
import java.io.Serializable;

@Named
@ConversationScoped
public class BookingBean implements Serializable {
  @Inject
  private PassengerFormBean passengerFormBean;
  @Inject
  private BookingFormBean bookingFormBean;
  @Inject
  private Conversation conversation;

  private Flight selectedFlight;

  public PassengerFormBean getPassengerFormBean() {
    return passengerFormBean;
  }

  public Flight getSelectedFlight() {
    return selectedFlight;
  }

  public String createPassengers() {
    this.passengerFormBean.initPassengers(
        this.bookingFormBean.getPassengerCount());
    return "/pages/passengerForm";
  }

  public String endBooking() {
    // conversation end
    conversation.end();
    return "/pages/bookingSuccess";
  }

  public String startBooking(Flight flight) {
    this.selectedFlight = flight;
    // start conversation
    conversation.begin();
    ;
    return "/pages/bookingForm";
  }
}
