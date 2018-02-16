package de.uni.frankfurt.webservice;

import de.uni.frankfurt.beans.JSONParserBean;
import de.uni.frankfurt.database.entity.Booking;
import de.uni.frankfurt.database.entity.Flight;
import de.uni.frankfurt.database.entity.Passenger;
import de.uni.frankfurt.database.service.BookingService;
import de.uni.frankfurt.database.service.FlightService;
import de.uni.frankfurt.exceptions.ConditionFailedException;
import de.uni.frankfurt.exceptions.ResourceNotFoundException;
import de.uni.frankfurt.exceptions.RestException;
import de.uni.frankfurt.json.exceptions.JsonSchemaException;
import io.swagger.v3.oas.annotations.Operation;
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
import java.util.HashMap;

@Path("/flights/{flightId}/bookings")
@RequestScoped
public class BookingWS {
  private static final Logger LOGGER = Logger.getLogger(BookingWS.class);

  @Inject
  private BookingService bookingService;
  @Inject
  private FlightService flightService;
  @Inject
  private JSONParserBean parser;

  @PathParam("flightId")
  private String flightId;

  @Path("")
  @GET
  @Produces(MediaType.APPLICATION_JSON)
  @Operation(
      summary = "Get Booking By Id",
      tags = {"booking"},
      responses = {
          @ApiResponse(
              responseCode = "200",
              description = "Found Booking",
              content = @Content(schema = @Schema(implementation = Booking.class))),
          @ApiResponse(responseCode = "404", description = "Booking not found",
              content = @Content(schema = @Schema(implementation = RestException.class))),
          @ApiResponse(responseCode = "404", description = "Flight not found",
              content = @Content(schema = @Schema(implementation = RestException.class)))})
  public String getBookings() throws ResourceNotFoundException {
    ArrayList<Booking> bookings = this.bookingService.getBookingsByFlight(
        this.getFlight());
    return parser.toJSON(bookings);
  }

  private Flight getFlight() throws ResourceNotFoundException {
    return this.flightService.getFlightById(this.flightId);
  }

  @Path("")
  @POST
  @Consumes(MediaType.APPLICATION_JSON)
  @Operation(
      summary = "Create new Booking",
      tags = {"booking"},
      responses = {
          @ApiResponse(
              responseCode = "200",
              description = "Created Booking",
              content = @Content(schema = @Schema(implementation = Booking.class))),
          @ApiResponse(responseCode = "404", description = "Flight not found",
              content = @Content(schema = @Schema(implementation = RestException.class))),
          @ApiResponse(responseCode = "412", description = "Input data violates conditions. See error message for detailed reason",
              content = @Content(schema = @Schema(implementation = RestException.class)))})
  public String createBooking(
      String bookingJSON) throws ResourceNotFoundException, ConditionFailedException, JsonSchemaException {
    Booking b = parser.fromJSON(bookingJSON, Booking.class);

    // new: BE validation for TAC
    if (!b.isTacAccepted()) {
      throw new ConditionFailedException("TAC not accepted");
    }

    // validate max valid number of passengers
    if (!this.bookingService.canCheckIn(this.getFlight(),
        b.getPassengers().size())) {
      throw new ConditionFailedException(
          String.format("Max %s free seats on the aircraft",
              this.bookingService.getFreeSeats(this.getFlight())),
          Flight.class);
    }

    // validate that passport and idcards are unique
    HashMap<String, String> numbers = new HashMap<>();

    for (Passenger p : b.getPassengers()) {
      String requiredNumber = this.getFlight().foreignTravel() ?
          p.getPassportNumber() :
          p.getIdCardNumber();
      if (numbers.containsKey(requiredNumber)) {
        throw new ConditionFailedException(
            String.format("Duplicated passenger with number %s",
                requiredNumber), Passenger.class);
      } else {
        numbers.put(requiredNumber, "");
      }
    }

    b = this.bookingService.createBooking(this.getFlight(), b.isInsurance(),
        b.getPassengers().toArray(new Passenger[b.getPassengers().size()]));
    return parser.toJSON(b);
  }

  @Path("{bookingId}")
  @GET
  @Produces(MediaType.APPLICATION_JSON)
  @Operation(
      summary = "Get Bookings by flight",
      tags = {"booking"},
      responses = {
          @ApiResponse(
              responseCode = "200",
              description = "Found Bookings",
              content = @Content(array = @ArraySchema(
                  schema = @Schema(implementation = Booking.class)))),
          @ApiResponse(responseCode = "404", description = "Flight not found",
              content = @Content(schema = @Schema(implementation = RestException.class)))})
  public String getBookingById(
      @PathParam("bookingId") String id
  ) throws ResourceNotFoundException {
    return parser.toJSON(bookingService.getBookingById(id));
  }
}
