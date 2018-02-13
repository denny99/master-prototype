package de.uni.frankfurt.webservice;

import de.uni.frankfurt.database.entity.Flight;
import de.uni.frankfurt.database.service.FlightService;
import de.uni.frankfurt.exceptions.BadRequestException;
import de.uni.frankfurt.exceptions.ResourceNotFoundException;
import de.uni.frankfurt.json.wrapper.JSONParser;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Path("flights")
@RequestScoped
public class FlightWS {
  @Inject
  private FlightService flightService;

  @Inject
  private JSONParser parser;

  @Path("{flightId}")
  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public String getFlightById(
      @PathParam("flightId") String id
  ) throws ResourceNotFoundException {
    return parser.toJSON(flightService.getFlightById(id));
  }

  @Path("")
  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public String getFlights(
      @DefaultValue("") @QueryParam("country") String country,
      @DefaultValue("") @QueryParam("city") String city,
      @DefaultValue("01.01.2018") @QueryParam("date") String isoDate,
      @DefaultValue("100") @QueryParam("limit") int limit,
      @DefaultValue("0") @QueryParam("offset") int offset,
      @DefaultValue("asc") @QueryParam("sortOrder") String sortOder
  ) throws BadRequestException {
    try {
      SimpleDateFormat formatter = new SimpleDateFormat("dd.MM.yyyy");
      Date date = formatter.parse(isoDate);
      List<Flight> flights = this.flightService.searchFlight(limit, offset,
          country, city,
          date, sortOder);
      return parser.toJSON(flights);
    } catch (ParseException e) {
      throw new BadRequestException(isoDate, Date.class);
    }
  }
}
