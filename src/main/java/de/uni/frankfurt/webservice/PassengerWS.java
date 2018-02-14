package de.uni.frankfurt.webservice;

import de.uni.frankfurt.database.entity.Passenger;
import de.uni.frankfurt.database.service.PassengerService;
import de.uni.frankfurt.exceptions.ResourceNotFoundException;
import de.uni.frankfurt.exceptions.RestException;
import de.uni.frankfurt.json.wrapper.JSONParser;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.apache.log4j.Logger;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.ArrayList;

@Path("/passengers")
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
  @Operation(
      summary = "Get Passenger By Id",
      tags = {"passenger"},
      responses = {
          @ApiResponse(
              responseCode = "200",
              description = "Found Passenger",
              content = @Content(schema = @Schema(implementation = Passenger.class))),
          @ApiResponse(responseCode = "404", description = "Passenger not found",
              content = @Content(schema = @Schema(implementation = RestException.class)))})
  public String getPassengerById(
      @PathParam("passengerId") String id
  ) throws ResourceNotFoundException {
    return parser.toJSON(passengerService.getPassengerById(id));
  }

  @Path("")
  @GET
  @Produces(MediaType.APPLICATION_JSON)
  @Operation(
      summary = "Search Passengers",
      tags = {"passenger"},
      responses = {
          @ApiResponse(
              responseCode = "200",
              description = "Found Passengers",
              content = @Content(array = @ArraySchema(
                  schema = @Schema(implementation = Passenger.class))))})
  public String getPassengers(
      @Parameter(description = "Partial Passport Number") @DefaultValue("") @QueryParam("passportNumber") String passportNumber,
      @Parameter(description = "Partial ID Card Number") @DefaultValue("") @QueryParam("idCardNumber") String idCardNumber) {
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
