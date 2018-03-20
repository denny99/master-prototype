package de.uni.frankfurt.webservice;

import de.uni.frankfurt.beans.JSONParserBean;
import de.uni.frankfurt.database.entity.Flight;
import de.uni.frankfurt.database.service.FlightService;
import de.uni.frankfurt.exceptions.BadRequestException;
import de.uni.frankfurt.exceptions.ResourceNotFoundException;
import de.uni.frankfurt.exceptions.RestException;
import de.uni.frankfurt.json.exceptions.JsonSchemaException;
import de.uni.frankfurt.json.responses.FlightSearchResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Path("/flights")
@RequestScoped
public class FlightWS {
  @Inject
  private FlightService flightService;

  @Inject
  private JSONParserBean parser;

  @Path("{flightId}")
  @GET
  @Produces(MediaType.APPLICATION_JSON)
  @Operation(
      summary = "Get Flight By Id",
      tags = {"flight"},
      responses = {
          @ApiResponse(
              responseCode = "200",
              description = "Found flight",
              content = @Content(schema = @Schema(implementation = Flight.class))),
          @ApiResponse(responseCode = "404", description = "Flight not found",
              content = @Content(schema = @Schema(implementation = RestException.class)))})
  public String getFlightById(
      @PathParam("flightId") String id
  ) throws ResourceNotFoundException, JsonSchemaException {
    return parser.toJSON(flightService.getFlightById(id));
  }

  @Path("")
  @GET
  @Produces(MediaType.APPLICATION_JSON)
  @Operation(
      summary = "Search Flights",
      tags = {"flight"},
      responses = {
          @ApiResponse(
              responseCode = "200",
              description = "Found Flights",
              content = @Content(schema = @Schema(implementation = FlightSearchResponse.class))),
          @ApiResponse(responseCode = "400", description = "Date format is incorrect",
              content = @Content(schema = @Schema(implementation = RestException.class)))})
  public String getFlights(
      @Parameter(description = "Country of Arrival airport") @DefaultValue("") @QueryParam("country") String country,
      @Parameter(description = "City of Arrival airport") @DefaultValue("") @QueryParam("city") String city,
      @Parameter(description = "Min departure date", schema = @Schema(
          type = "string", format = "date-time")) @DefaultValue("01.01.2018") @QueryParam("date") String isoDate,
      @Parameter(description = "Max number of flights to retrieve") @DefaultValue("100") @QueryParam("limit") int limit,
      @Parameter(description = "Number of flights to skip") @DefaultValue("0") @QueryParam("offset") int offset,
      @Parameter(description = "Sort order for date") @DefaultValue("asc") @QueryParam("sortOrder") String sortOder
  ) throws BadRequestException, JsonSchemaException {
    try {
      SimpleDateFormat formatter = new SimpleDateFormat("dd.MM.yyyy");
      Date date = formatter.parse(isoDate);
      List<Flight> flights = this.flightService.searchFlight(country, city,
          date, sortOder);

      Integer max = flights.size();

      if (flights.size() > limit) {
        flights = flights.subList(offset,
            Math.min(offset + limit, flights.size()));
      }

      return parser.toJSON(
          new FlightSearchResponse(max, offset, limit, flights));
    } catch (ParseException e) {
      throw new BadRequestException(isoDate, Date.class);
    }
  }
}
