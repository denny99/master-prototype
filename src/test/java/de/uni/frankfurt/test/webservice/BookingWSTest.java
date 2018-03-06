package de.uni.frankfurt.test.webservice;

import de.uni.frankfurt.database.entity.Booking;
import de.uni.frankfurt.database.entity.Flight;
import de.uni.frankfurt.database.entity.Passenger;
import de.uni.frankfurt.database.service.DatabaseMock;
import de.uni.frankfurt.json.exceptions.JsonSchemaException;
import de.uni.frankfurt.test.json.responses.APIResponse;
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
  private static Booking createdBooking;

  // note injection not possible (we are outside of the server)
  @Test
  @InSequence(1)
  @RunAsClient
  public void createBooking() throws JsonSchemaException {
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
    createdBooking = response.getResponseObject();

    // test duplicated passenger
    passengers.add(DatabaseMock.p1);

    // test too many passengers
    response = this.postResourceToAPI(basePath, b, Booking.class);
    Assert.assertTrue("error occurred", response.hasError());
    Assert.assertEquals("correct http code",
        response.getError().getStatusCode(), 412);
    Assert.assertEquals("correct error message",
        response.getError().getErrorMessage(),
        String.format("Duplicated passenger with number %s",
            flight.foreignTravel() ?
                DatabaseMock.p1.getPassportNumber() :
                DatabaseMock.p1.getIdCardNumber()));

    for (int i = 0; i < 1000; i++) {
      passengers.add(DatabaseMock.p1);
    }

    response = this.postResourceToAPI(basePath, b, Booking.class);
    Assert.assertTrue("error occurred", response.hasError());
    Assert.assertEquals("correct http code",
        response.getError().getStatusCode(), 412);
  }

  /**
   * get flight list and return first
   *
   * @return first flight
   */
  public Flight getRandomFlight() throws JsonSchemaException {
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

  @Test
  @InSequence(2)
  @RunAsClient
  public void getBookingById() {
    String basePath = this.getResourceURL();
    // test get booking by id
    APIResponse<Booking> response = this.getResourceFromAPI(
        basePath + "/" + createdBooking.getId(),
        Booking.class);
    Assert.assertTrue("no error", !response.hasError());
    // test get booking by id with error
    response = this.getResourceFromAPI(basePath + "/NOTANID",
        Booking.class);
    Assert.assertTrue("error occurred", response.hasError());
    Assert.assertEquals("correct http code",
        response.getError().getStatusCode(), 404);
  }

  /**
   * construct url with first found flight
   *
   * @return url
   */
  @Override
  public String getResourceURL() {
    try {
      return this.getResourceURL(this.getRandomFlight());
    } catch (JsonSchemaException e) {
      return "";
    }
  }

  @Test
  @InSequence(3)
  @RunAsClient
  public void getBookings() throws JsonSchemaException {
    String basePath = this.getResourceURL(createdBooking.getFlight());
    // test get booking by id
    APIResponse<ArrayList<Booking>> response = this.getResourcesFromAPI(
        basePath, new ArrayList<Booking>() {
        }.getClass().getGenericSuperclass());
    Assert.assertTrue("no error", !response.hasError());
    Assert.assertEquals("correct amount of bookings",
        response.getResponseObject().size(), 1);
  }
}
