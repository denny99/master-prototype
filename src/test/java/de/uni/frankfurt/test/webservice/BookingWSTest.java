package de.uni.frankfurt.test.webservice;

import de.uni.frankfurt.database.entity.Booking;
import de.uni.frankfurt.database.entity.Flight;
import de.uni.frankfurt.database.entity.Passenger;
import de.uni.frankfurt.database.service.DatabaseMock;
import de.uni.frankfurt.json.wrapper.JSONParser;
import org.jboss.arquillian.container.test.api.Deployment;
import org.jboss.arquillian.container.test.api.RunAsClient;
import org.jboss.arquillian.junit.Arquillian;
import org.jboss.arquillian.test.api.ArquillianResource;
import org.jboss.shrinkwrap.api.ArchivePaths;
import org.jboss.shrinkwrap.api.ShrinkWrap;
import org.jboss.shrinkwrap.api.asset.EmptyAsset;
import org.jboss.shrinkwrap.api.spec.WebArchive;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URL;
import java.util.ArrayList;

@RunWith(Arquillian.class)
public class BookingWSTest {
  @ArquillianResource
  private URL deploymentUrl;
  private JSONParser parser;
  private WebTarget webTarget;

  @Deployment
  public static WebArchive createDeployment() {
    return ShrinkWrap.create(WebArchive.class)
        .addPackages(true, "de.uni.frankfurt")
        .addAsWebInfResource(EmptyAsset.INSTANCE,
            ArchivePaths.create("beans.xml"));
  }

  @Before
  public void setup() throws MalformedURLException {
    this.parser = new JSONParser();
    Client client = ClientBuilder.newClient();
    webTarget = client.target(
        URI.create(new URL(deploymentUrl, "api").toExternalForm()));
  }

  // note injection not possible (we are outside of the server)
  @Test
  @RunAsClient
  public void testBookings() {
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
    Flight flight = flights.get(0);

    // setup basic url
    String basePath = String.format("/flights/%s/bookings", flight.getId());

    ArrayList<Passenger> passengers = new ArrayList<>();
    passengers.add(DatabaseMock.p1);
    passengers.add(DatabaseMock.p2);

    // create Booking with the 2 static passengers
    Booking b = new Booking(flight, false, passengers);
    b.setTacAccepted(true);

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
