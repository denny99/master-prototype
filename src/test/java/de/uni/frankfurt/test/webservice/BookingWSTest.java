package de.uni.frankfurt.test.webservice;

import de.uni.frankfurt.database.entity.Booking;
import de.uni.frankfurt.database.entity.Flight;
import de.uni.frankfurt.database.service.FlightService;
import de.uni.frankfurt.database.service.PassengerService;
import de.uni.frankfurt.json.wrapper.JSONParser;
import org.jboss.arquillian.container.test.api.Deployment;
import org.jboss.arquillian.container.test.api.RunAsClient;
import org.jboss.arquillian.extension.rest.client.ArquillianResteasyResource;
import org.jboss.arquillian.junit.Arquillian;
import org.jboss.shrinkwrap.api.ArchivePaths;
import org.jboss.shrinkwrap.api.ShrinkWrap;
import org.jboss.shrinkwrap.api.asset.EmptyAsset;
import org.jboss.shrinkwrap.api.spec.WebArchive;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;

import javax.inject.Inject;
import javax.ws.rs.client.Entity;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@RunWith(Arquillian.class)
public class BookingWSTest {

  @Inject
  private FlightService flightService;

  @Inject
  private PassengerService passengerService;
  @Inject
  private JSONParser parser;

  @Deployment
  public static WebArchive createDeployment() {
    return ShrinkWrap.create(WebArchive.class)
        .addPackages(true, "de.uni.frankfurt")
        .addAsWebInfResource(EmptyAsset.INSTANCE,
            ArchivePaths.create("beans.xml"));
  }

  // note injection not possible (we are outside of the server)
  @Test
  @RunAsClient
  public void testBookings(
      @ArquillianResteasyResource final WebTarget webTarget) {
    // select first random flight
    // TODO retrieve flight from BE
    Flight flight = flightService.getFlights().get(0);

    // setup basic url
    String basePath = String.format("flights/%s/bookings", flight.getId());

    // create Booking with the 2 static passengers
    Booking b = new Booking(flight, false, passengerService.getPassengers());

    final Response response = webTarget
        .path(basePath)
        .request(MediaType.APPLICATION_JSON)
        .post(Entity.json(b));

    // test get booking by id

    // test get booking by id with error

    // test get bookings
    Booking createdBooking = response.readEntity(Booking.class);
    Assert.assertTrue("id created", !createdBooking.getId().isEmpty());
//    ListResponse<Booking> result = parser.fromJSON(response,
//        new ListResponse<Booking>() {
//        }.getClass().getGenericSuperclass());
//    Assert.assertEquals("amount of bookings for flight", 1,
//        result.getBody().size());

  }
}
