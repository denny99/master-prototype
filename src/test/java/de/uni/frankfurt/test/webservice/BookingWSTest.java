package de.uni.frankfurt.test.webservice;

import de.uni.frankfurt.database.entity.Booking;
import de.uni.frankfurt.database.entity.Flight;
import de.uni.frankfurt.database.entity.Passenger;
import de.uni.frankfurt.database.service.DatabaseMock;
import de.uni.frankfurt.json.wrapper.APIResponse;
import org.jboss.arquillian.container.test.api.RunAsClient;
import org.jboss.arquillian.junit.Arquillian;
import org.jboss.arquillian.junit.InSequence;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;

import javax.ws.rs.core.MediaType;
import java.util.ArrayList;

@RunWith(Arquillian.class)
public class BookingWSTest extends WSTest {
  /**
   * construct url with first found flight
   *
   * @return url
   */
  @Override
  public String getResourceURL() {
    return this.getResourceURL(this.getRandomFlight());
  }

  /**
   * create url with given flight
   *
   * @param flight flight
   * @return rest uri
   */
  public String getResourceURL(Flight flight) {
    // setup basic url
    return String.format("/flights/%s/bookings", flight.getId());
  }

  /**
   * get flight list and return first
   *
   * @return first flight
   */
  public Flight getRandomFlight() {
    // get all flights
    String jsonFlights = webTarget
        .path("/flights")
        .request(MediaType.APPLICATION_JSON)
        .get().readEntity(String.class);

    // parse json
    ArrayList<Flight> flights = parser.fromJSON(jsonFlights,
        new ArrayList<Flight>() {
        }.getClass().getGenericSuperclass());

    // select first random flight

    return flights.get(0);
  }

  // note injection not possible (we are outside of the server)
  @Test
  @InSequence(1)
  @RunAsClient
  public void createBooking() {
    Flight flight = this.getRandomFlight();
    String basePath = this.getResourceURL(flight);

    ArrayList<Passenger> passengers = new ArrayList<>();
    passengers.add(DatabaseMock.p1);
    passengers.add(DatabaseMock.p2);

    // create Booking with the 2 static passengers
    Booking b = new Booking(flight, false, passengers);

    // test tac not accepted
    APIResponse<Booking> response = this.postResourceToAPI(basePath, b,
        Booking.class);
    Assert.assertTrue("error occurred", response.hasError());
    Assert.assertEquals("correct http code",
        response.getError().getStatusCode(), 412);
    Assert.assertEquals("correct error message",
        response.getError().getErrorMessage(), "TAC not accepted");

    // correct post
    b.setTacAccepted(true);
    // get booking
    response = this.postResourceToAPI(basePath, b, Booking.class);
    Assert.assertTrue("id created",
        !response.getResponseObject().getId().isEmpty());

    // test too many passengers
    response = this.postResourceToAPI(basePath, b, Booking.class);
    Assert.assertTrue("error occurred", response.hasError());
    Assert.assertEquals("correct http code",
        response.getError().getStatusCode(), 412);

    // test duplicated passenger

  }

  @Test
  @InSequence(2)
  @RunAsClient
  public void getBookingById() {
    // test get booking by id

    // test get booking by id with error
  }

  @Test
  @InSequence(3)
  @RunAsClient
  public void getBookings() {
  }
}
