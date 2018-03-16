package de.uni.frankfurt.test.webservice;

import de.uni.frankfurt.database.entity.Flight;
import de.uni.frankfurt.json.exceptions.JsonSchemaException;
import de.uni.frankfurt.json.responses.FlightSearchResponse;
import de.uni.frankfurt.json.responses.ValidationResponse;
import de.uni.frankfurt.test.json.responses.APIResponse;
import org.jboss.arquillian.container.test.api.RunAsClient;
import org.jboss.arquillian.junit.Arquillian;
import org.jboss.arquillian.junit.InSequence;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;

import java.util.HashMap;

@RunWith(Arquillian.class)
public class AjaxWSTest extends WSTest {

  @Test
  @InSequence(1)
  @RunAsClient
  public void validatePassengerCount() throws JsonSchemaException {
    APIResponse<FlightSearchResponse> flightResponse = this.getResourcesFromAPI(
        "/flights", FlightSearchResponse.class);
    Flight flight = flightResponse.getResponseObject().getData().get(0);

    HashMap<String, String> query = new HashMap<>();

    query.put("passengerCount",
        String.valueOf(flight.getAircraft().getPassengerCount() + 10));

    // validation not ok
    APIResponse<ValidationResponse> response = this.getResourcesFromAPI(
        this.getResourceURL() + "/" + flight.getId() +
            "/validatePassengerCount", query,
        ValidationResponse.class);
    Assert.assertTrue("no error", !response.hasError());
    Assert.assertTrue("validation error",
        response.getResponseObject().getError());

    query.put("passengerCount",
        String.valueOf(flight.getAircraft().getPassengerCount() - 10));

    // test ok
    response = this.getResourcesFromAPI(
        this.getResourceURL() + "/" + flight.getId() +
            "/validatePassengerCount", query,
        ValidationResponse.class);
    Assert.assertTrue("no error", !response.hasError());
    Assert.assertTrue("no validation error",
        !response.getResponseObject().getError());
  }

  /**
   * @return url
   */
  @Override
  public String getResourceURL() {
    return "/ajax";
  }
}
