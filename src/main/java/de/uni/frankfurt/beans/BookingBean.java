package de.uni.frankfurt.beans;

import de.uni.frankfurt.database.entity.Flight;

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

  public PassengerFormBean getPassengerFormBean() {
    return passengerFormBean;
  }

  public BookingFormBean getBookingFormBean() {
    return bookingFormBean;
  }

  public String cancelBooking() {
    conversation.end();
    return "/pages/flightOverview";
  }

  public String createPassengers() {
    this.passengerFormBean.initPassengers(
        this.bookingFormBean.getPassengerCount());
    return "/pages/passengerForm";
  }

  public String finishBooking() {
    // save data to db

    // conversation end
    conversation.end();
    return "/pages/bookingSuccess";
  }

  public String startBooking(Flight flight) {
    this.bookingFormBean.setSelectedFlight(flight);
    // start conversation
    conversation.begin();
    return "/pages/bookingForm";
  }
}
