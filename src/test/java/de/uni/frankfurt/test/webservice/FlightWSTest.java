package de.uni.frankfurt.test.webservice;

import de.uni.frankfurt.database.entity.Flight;
import de.uni.frankfurt.json.wrapper.APIResponse;
import org.jboss.arquillian.container.test.api.RunAsClient;
import org.jboss.arquillian.junit.Arquillian;
import org.jboss.arquillian.junit.InSequence;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;

@RunWith(Arquillian.class)
public class FlightWSTest extends WSTest {
  private static final String TEST_DATE = "04.04.2018";
  private static final String TEST_CITY = "Frankfurt";
  private static Flight flight;

  @Test
  @InSequence(2)
  @RunAsClient
  public void getFlightById() {
    String basePath = this.getResourceURL();
    // test get booking by id
    APIResponse<Flight> response = this.getResourceFromAPI(
        basePath + "/" + flight.getId(),
        Flight.class);
    Assert.assertTrue("no error", !response.hasError());
    // test get booking by id with error
    response = this.getResourceFromAPI(basePath + "/NOTANID",
        Flight.class);
    Assert.assertTrue("error occurred", response.hasError());
    Assert.assertEquals("correct http code",
        response.getError().getStatusCode(), 404);
  }

  // note injection not possible (we are outside of the server)
  @Test
  @InSequence(1)
  @RunAsClient
  public void getFlights() throws ParseException {
    HashMap<String, String> query = new HashMap<>();
    query.put("limit", "10");
    String basePath = this.getResourceURL();
    // test limit
    APIResponse<ArrayList<Flight>> response = this.getResourcesFromAPI(basePath,
        query,
        new ArrayList<Flight>() {
        }.getClass().getGenericSuperclass());

    Assert.assertTrue("no error", !response.hasError());
    Assert.assertEquals("correct size", response.getResponseObject().size(),
        10);
    flight = response.getResponseObject().get(0);

    // test offset
    query.put("offset", "10");
    response = this.getResourcesFromAPI(basePath, query,
        new ArrayList<Flight>() {
        }.getClass().getGenericSuperclass());

    Assert.assertTrue("no error", !response.hasError());
    Assert.assertEquals("correct size", response.getResponseObject().size(),
        10);
    Assert.assertNotEquals("new flight at index 0", flight.getId(),
        response.getResponseObject().get(0).getId());

    // test invalid date
    query.put("date", "aa.BB.YYYY");
    response = this.getResourcesFromAPI(basePath, query,
        new ArrayList<Flight>() {
        }.getClass().getGenericSuperclass());

    Assert.assertTrue("has error", response.hasError());
    Assert.assertEquals("correct error code",
        response.getError().getStatusCode(),
        400);

    SimpleDateFormat formatter = new SimpleDateFormat("dd.MM.yyyy");
    Date date = formatter.parse(TEST_DATE);
    query.put("date", TEST_DATE);
    // test date
    response = this.getResourcesFromAPI(basePath, query,
        new ArrayList<Flight>() {
        }.getClass().getGenericSuperclass());
    Assert.assertTrue("no error", !response.hasError());
    for (Flight flight1 : response.getResponseObject()) {
      Assert.assertTrue("correct date filter",
          flight1.getDateTime().after(date));
    }

    // test city
    query.put("city", TEST_CITY);
    response = this.getResourcesFromAPI(basePath, query,
        new ArrayList<Flight>() {
        }.getClass().getGenericSuperclass());
    Assert.assertTrue("no error", !response.hasError());
    for (Flight flight1 : response.getResponseObject()) {
      Assert.assertEquals("correct date filter", flight1.getArrival().getCity(),
          TEST_CITY);
    }

  }

  /**
   * @return url
   */
  @Override
  public String getResourceURL() {
    return "/flights";
  }
}
