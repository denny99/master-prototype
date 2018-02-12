package de.uni.frankfurt.database.service;

import de.uni.frankfurt.database.entity.Booking;
import de.uni.frankfurt.database.entity.Flight;
import de.uni.frankfurt.database.entity.Passenger;
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
@ApplicationScoped
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

  public boolean canCheckIn(
      Flight flight,
      Integer passengerCount) {
    return this.getFreeSeats(flight) >= passengerCount;
  }

  public Integer getFreeSeats(Flight flight) {
    Integer bookedSeats = 0;
    Integer maxPassengers = flight.getAircraft().getPassengerCount();
    ArrayList<Booking> bookings = this.getBookingsByFlight(flight);
    for (Booking booking : bookings) {
      bookedSeats += booking.getPassengers().size();
    }
    return maxPassengers - bookedSeats;
  }

  public ArrayList<Booking> getBookingsByFlight(
      Flight flight) {
    ArrayList<Booking> result = new ArrayList<Booking>();
    for (Booking booking : this.databaseMock.getBookings()) {
      if (booking.getFlight().getId().equals(flight.getId())) {
        result.add(booking);
      }
    }
    return result;
  }

  /**
   * @param flight     flight the booking belongs to
   * @param passengers passenger that wanna check in
   * @return created booking with correct data
   * @throws ResourceNotFoundException flight not found
   */
  public Booking createBooking(
      Flight flight, boolean insurance,
      Passenger[] passengers) throws ResourceNotFoundException {
    Flight f = this.flightService.getFlightById(flight.getId());
    Booking b = new Booking(f, insurance,
        this.passengerService.createPassengers(passengers));
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
}
