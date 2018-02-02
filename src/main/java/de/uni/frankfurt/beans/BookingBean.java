package de.uni.frankfurt.beans;

import de.uni.frankfurt.database.entity.Flight;
import de.uni.frankfurt.database.service.BookingService;
import de.uni.frankfurt.exceptions.ResourceNotFoundException;

import javax.enterprise.context.Conversation;
import javax.enterprise.context.ConversationScoped;
import javax.faces.application.FacesMessage;
import javax.faces.component.UIComponent;
import javax.faces.component.UIInput;
import javax.faces.context.FacesContext;
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
  private boolean showInfo = false;

  public PassengerFormBean getPassengerFormBean() {
    return passengerFormBean;
  }

  public BookingFormBean getBookingFormBean() {
    return bookingFormBean;
  }

  public boolean isShowInfo() {
    return showInfo;
  }

  /**
   * cancel booking process and reset data
   *
   * @return return to flight overview
   * @ bookingDetails/passengerForm/bookingForm
   */
  public String cancelBooking() {
    conversation.end();
    return "/pages/flightOverview";
  }

  public String confirmBooking() {
    this.showInfo = true;
    return null;
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
   * init passengerForm bean (creates new empty passengers)
   *
   * @return passengerForm file
   */
  public String createPassengers() {
    this.passengerFormBean.initPassengers(
        this.bookingFormBean.getPassengerCount());
    return "/pages/passengerForm";
  }

  /**
   * save booking and show success message
   *
   * @return bookingSuccess file
   * @throws ResourceNotFoundException should never ever happen
   * @ bookingDetails
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
   *
   * @param flight flight clicked in the datatable
   * @return bookingForm file
   * @ flightOverview
   */
  public String startBooking(Flight flight) {
    this.bookingFormBean.setSelectedFlight(flight);
    // start conversation
    conversation.begin();
    return "/pages/bookingForm";
  }

  /**
   * validate max number of passenger for flight
   *
   * @param fc        context
   * @param component affected component
   * @param value     value entered in input
   * @ bookingForm:passengerCountOutput
   */
  public void validateTac(
      final FacesContext fc, final UIComponent component, final Object value) {
    if (value != null) {
      final Boolean tacAccepted = (Boolean) value;
      if (!tacAccepted) {
        ((UIInput) component).setValid(false);
        final String msg = "You have to accept the TAC!";
        fc.addMessage(component.getClientId(fc), new FacesMessage(msg));
      }
    }
  }
}
