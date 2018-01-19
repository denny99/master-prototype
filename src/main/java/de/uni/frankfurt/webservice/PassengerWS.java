package de.uni.frankfurt.webservice;

import de.uni.frankfurt.database.DatabaseMock;
import de.uni.frankfurt.database.Passenger;
import de.uni.frankfurt.exceptions.ResourceNotFoundException;
import de.uni.frankfurt.json.wrapper.JSONParser;
import org.apache.log4j.Logger;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

@Path("/passengers")
@RequestScoped
public class PassengerWS {
  private static final Logger LOG = Logger.getLogger(PassengerWS.class);

  @Inject
  private DatabaseMock databaseMock;

  @Inject
  private JSONParser parser;

  PassengerWS() {
  }

  @Path("/")
  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public String getPassengers() {
    return parser.toJSON(databaseMock.getPassengers());
  }

  @Path("/")
  @POST
  @Consumes(MediaType.APPLICATION_JSON)
  public String createPassenger(String passengerJSON) {
    Passenger p = databaseMock.createPassenger(
        parser.fromJSON(passengerJSON, Passenger.class));
    return parser.toJSON(p);
  }

  @Path("/{passengerId}")
  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public String getPassengerById(
      @PathParam("passengerId") String id
  ) throws ResourceNotFoundException {
    return parser.toJSON(databaseMock.getPassengerById(id));
  }
}
