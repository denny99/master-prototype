package de.uni.frankfurt.test.webservice;

import de.uni.frankfurt.database.entity.Passenger;
import de.uni.frankfurt.json.exceptions.JsonSchemaException;
import de.uni.frankfurt.test.json.responses.APIResponse;
import org.jboss.arquillian.container.test.api.RunAsClient;
import org.jboss.arquillian.junit.Arquillian;
import org.jboss.arquillian.junit.InSequence;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;

import java.util.ArrayList;
import java.util.HashMap;

@RunWith(Arquillian.class)
public class PassengerWSTest extends WSTest {
  private static Passenger passenger;

  @Test
  @InSequence(2)
  @RunAsClient
  public void getPassengerById() {
    String basePath = this.getResourceURL();
    // test get booking by id
    APIResponse<Passenger> response = this.getResourceFromAPI(
        basePath + "/" + passenger.getId(),
        Passenger.class);
    Assert.assertTrue("no error", !response.hasError());
    // test get booking by id with error
    response = this.getResourceFromAPI(basePath + "/NOTANID",
        Passenger.class);
    Assert.assertTrue("error occurred", response.hasError());
    Assert.assertEquals("correct http code",
        response.getError().getStatusCode(), 404);
  }

  /**
   * @return url
   */
  @Override
  public String getResourceURL() {
    return "/passengers";
  }

  // note injection not possible (we are outside of the server)
  @Test
  @InSequence(1)
  @RunAsClient
  public void getPassengers() throws JsonSchemaException {
    // test simple get
    APIResponse<ArrayList<Passenger>> response = this.getResourcesFromAPI(
        this.getResourceURL(), new ArrayList<Passenger>() {
        }.getClass().getGenericSuperclass());

    Assert.assertTrue("no error", !response.hasError());
    Assert.assertEquals("correct number of passengers",
        response.getResponseObject().size(), 2);
    passenger = response.getResponseObject().get(0);

    HashMap<String, String> passportQuery = new HashMap<>();
    passportQuery.put("passportNumber", "P12345");
    // test get by passport
    response = this.getResourcesFromAPI(
        this.getResourceURL(), passportQuery, new ArrayList<Passenger>() {
        }.getClass().getGenericSuperclass());

    Assert.assertTrue("no error", !response.hasError());
    Assert.assertEquals("correct number of passengers",
        response.getResponseObject().size(), 1);

    HashMap<String, String> idCardQuery = new HashMap<>();
    idCardQuery.put("idCardNumber", "12345");
    // test get by id card
    response = this.getResourcesFromAPI(
        this.getResourceURL(), idCardQuery,
        new ArrayList<Passenger>() {
        }.getClass().getGenericSuperclass());

    Assert.assertTrue("no error", !response.hasError());
    Assert.assertEquals("correct number of passengers",
        response.getResponseObject().size(), 1);
  }
}
