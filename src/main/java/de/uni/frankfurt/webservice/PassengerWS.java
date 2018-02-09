package de.uni.frankfurt.webservice;

import de.uni.frankfurt.database.entity.Passenger;
import de.uni.frankfurt.database.service.PassengerService;
import de.uni.frankfurt.exceptions.ResourceNotFoundException;
import de.uni.frankfurt.json.wrapper.JSONParser;
import org.apache.log4j.Logger;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.ArrayList;

@Path("passengers")
@RequestScoped
public class PassengerWS {
  private static final Logger LOGGER = Logger.getLogger(PassengerWS.class);

  @Inject
  private PassengerService passengerService;

  @Inject
  private JSONParser parser;

  @Path("{passengerId}")
  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public String getPassengerById(
      @PathParam("passengerId") String id
  ) throws ResourceNotFoundException {
    return parser.toJSON(passengerService.getPassengerById(id));
  }

  @Path("")
  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public String getPassengers(
      @DefaultValue("") @QueryParam("passportNumber") String passportNumber,
      @DefaultValue("") @QueryParam("idCardNumber") String idCardNumber) {
    ArrayList<Passenger> passengers = new ArrayList<>();
    // filter requested?
    if (!passportNumber.isEmpty()) {
      passengers.add(
          passengerService.getPassengerByIdCardNumber(passportNumber));
    } else if (!idCardNumber.isEmpty()) {
      passengers.add(passengerService.getPassengerByIdCardNumber(idCardNumber));
    } else {
      passengers = passengerService.getPassengers();
    }
    return parser.toJSON(passengers);
  }
}
