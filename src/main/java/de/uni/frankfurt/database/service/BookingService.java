package de.uni.frankfurt.database.service;

import de.uni.frankfurt.database.entity.Booking;
import de.uni.frankfurt.database.entity.Flight;
import de.uni.frankfurt.exceptions.ResourceNotFoundException;
import org.apache.log4j.Logger;

import javax.enterprise.context.SessionScoped;
import javax.inject.Inject;
import javax.inject.Named;
import java.io.Serializable;
import java.util.ArrayList;

/**
 *
 */
@Named
@SessionScoped
public class BookingService implements Serializable {
  private static final Logger LOG = Logger.getLogger(BookingService.class);

  @Inject
  private DatabaseMock databaseMock;
  @Inject
  private FlightService flightService;
  @Inject
  private PassengerService passengerService;

  public ArrayList<Booking> getBookings() {
    return databaseMock.getBookings();
  }

  public boolean canCheckIn(Integer passengerCount) {
    return false;
  }

  /**
   * @param booking booking to create
   * @return created booking with correct data
   * @throws ResourceNotFoundException flight not found
   */
  public Booking createBooking(
      Booking booking) throws ResourceNotFoundException {
    Flight f = this.flightService.getFlightById(booking.getFlight().getId());
    Booking b = new Booking(f,
        this.passengerService.createPassengers(booking.getPassengers()));
    this.databaseMock.addBooking(b);
    return b;
  }

  /**
   * @param id id of booking
   * @return found booking
   * @throws ResourceNotFoundException id does not exist
   */
  public Booking getBookingById(String id) throws ResourceNotFoundException {
    for (Booking booking : this.databaseMock.getBookings()) {
      if (booking.getId().equals(id)) {
        return booking;
      }
    }
    throw new ResourceNotFoundException(id, Booking.class);
  }

  public Integer getFreeSeats(Flight flight) {
    int maxSeats = flight.getAircraft().getPassengerCount();
    // TODO
    return null;
  }
}
