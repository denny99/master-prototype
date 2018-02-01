package de.uni.frankfurt.beans;

import de.uni.frankfurt.database.entity.Flight;
import de.uni.frankfurt.database.service.BookingService;
import de.uni.frankfurt.exceptions.ResourceNotFoundException;

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
  private BookingService bookingService;
  @Inject
  private Conversation conversation;

  public PassengerFormBean getPassengerFormBean() {
    return passengerFormBean;
  }

  public BookingFormBean getBookingFormBean() {
    return bookingFormBean;
  }

  /**
   * move back to passenger form
   *
   * @return file path
   * @ bookingDetails
   */
  public String back() {
    return "/pages/passengerForm";
  }

  /**
   * cancel booking process and reset data
   * @ bookingDetails/passengerForm/bookingForm
   * @return return to flight overview
   */
  public String cancelBooking() {
    conversation.end();
    return "/pages/flightOverview";
  }

  /**
   * init passengerForm bean (creates new empty passengers)
   * @return passengerForm file
   */
  public String createPassengers() {
    this.passengerFormBean.initPassengers(
        this.bookingFormBean.getPassengerCount());
    return "/pages/passengerForm";
  }

  /**
   * save booking and show success message
   * @ bookingDetails
   * @return bookingSuccess file
   * @throws ResourceNotFoundException should never ever happen
   */
  public String finishBooking() throws ResourceNotFoundException {
    // save data to db
    this.bookingService.createBooking(this.bookingFormBean.getSelectedFlight(),
        this.bookingFormBean.getTravelInsurance(),
        this.passengerFormBean.getPassengers());

    // conversation end
    conversation.end();
    return "/pages/bookingSuccess";
  }

  /**
   * inits bookingForm bean
   * @ flightOverview
   * @param flight flight clicked in the datatable
   * @return bookingForm file
   */
  public String startBooking(Flight flight) {
    this.bookingFormBean.setSelectedFlight(flight);
    // start conversation
    conversation.begin();
    return "/pages/bookingForm";
  }
}
