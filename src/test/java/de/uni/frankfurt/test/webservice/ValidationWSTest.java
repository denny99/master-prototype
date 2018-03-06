package de.uni.frankfurt.test.webservice;

import de.uni.frankfurt.database.entity.Flight;
import de.uni.frankfurt.json.exceptions.JsonSchemaException;
import de.uni.frankfurt.json.request.ValidatePassengerCountRequest;
import de.uni.frankfurt.json.responses.ValidationResponse;
import de.uni.frankfurt.test.json.responses.APIResponse;
import org.jboss.arquillian.container.test.api.RunAsClient;
import org.jboss.arquillian.junit.Arquillian;
import org.jboss.arquillian.junit.InSequence;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;

import java.util.ArrayList;

@RunWith(Arquillian.class)
public class ValidationWSTest extends WSTest {

  @Test
  @InSequence(1)
  @RunAsClient
  public void validatePassengerCount() throws JsonSchemaException {
    APIResponse<ArrayList<Flight>> flightResponse = this.getResourcesFromAPI(
        "/flights",
        new ArrayList<Flight>() {
        }.getClass().getGenericSuperclass());
    Flight flight = flightResponse.getResponseObject().get(0);

    // validation not ok
    APIResponse<ValidationResponse> response = this.postResourceToAPI(
        this.getResourceURL() + "/" + flight.getId() +
            "/validatePassengerCount", new ValidatePassengerCountRequest(
            flight.getAircraft().getPassengerCount() + 10),
        ValidationResponse.class);
    Assert.assertTrue("no error", !response.hasError());
    Assert.assertTrue("validation error",
        response.getResponseObject().getError());

    // test ok
    response = this.postResourceToAPI(
        this.getResourceURL() + "/" + flight.getId() +
            "/validatePassengerCount", new ValidatePassengerCountRequest(
            flight.getAircraft().getPassengerCount() - 10),
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
    return "/validations";
  }
}
