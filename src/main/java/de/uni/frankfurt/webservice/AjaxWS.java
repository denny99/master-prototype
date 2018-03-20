package de.uni.frankfurt.webservice;

import de.uni.frankfurt.beans.JSONParserBean;
import de.uni.frankfurt.database.entity.Flight;
import de.uni.frankfurt.database.service.BookingService;
import de.uni.frankfurt.database.service.FlightService;
import de.uni.frankfurt.exceptions.ResourceNotFoundException;
import de.uni.frankfurt.exceptions.RestException;
import de.uni.frankfurt.json.exceptions.JsonSchemaException;
import de.uni.frankfurt.json.responses.ValidationResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.apache.log4j.Logger;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

@Path("/ajax/")
@RequestScoped
public class AjaxWS {
  private static final Logger LOGGER = Logger.getLogger(AjaxWS.class);

  @Inject
  private BookingService bookingService;
  @Inject
  private FlightService flightService;
  @Inject
  private JSONParserBean parser;

  /**
   * validate max number of passenger for flight
   *
   * @ bookingForm:passengerCountOutput
   */
  @Path("/{flightId}/validatePassengerCount")
  @GET
  @Consumes(MediaType.APPLICATION_JSON)
  @Operation(
      summary = "Validate entered Passenger amount for Flight",
      tags = {"validation"},
      responses = {
          @ApiResponse(
              responseCode = "200",
              description = "Status Object",
              content = @Content(schema = @Schema(implementation = ValidationResponse.class))),
          @ApiResponse(responseCode = "400", description = "Submitted data is invalid",
              content = @Content(schema = @Schema(implementation = RestException.class))),
          @ApiResponse(responseCode = "404", description = "Flight not found",
              content = @Content(schema = @Schema(implementation = RestException.class)))})
  public String validatePassengerCount(
      @PathParam("flightId") String id,
      @QueryParam("passengerCount") Integer passengerCount) throws ResourceNotFoundException, JsonSchemaException {
    Flight flight = this.flightService.getFlightById(id);
    String msg = null;
    Boolean error = false;
    if (!this.bookingService.canCheckIn(flight,
        passengerCount)) {
      msg = String.format("Max %s free seats on the aircraft",
          this.bookingService.getFreeSeats(flight));
      error = true;
    }
    return this.parser.toJSON(new ValidationResponse(error, msg));
  }
}
