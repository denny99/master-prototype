package de.uni.frankfurt.webservice;

import de.uni.frankfurt.database.DatabaseMock;
import de.uni.frankfurt.database.Flight;
import de.uni.frankfurt.exceptions.ResourceNotFoundException;
import de.uni.frankfurt.json.wrapper.JSONParser;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

@Path("/flights")
@RequestScoped
public class FlightWS {
  @Inject
  private DatabaseMock databaseMock;

  @Inject
  private JSONParser parser;

  FlightWS() {
  }

  @Path("/{flightId}")
  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public String getFlightById(
      @PathParam("flightId") String id
  ) throws ResourceNotFoundException {
    return parser.toJSON(databaseMock.getFlightById(id));
  }

  @Path("/")
  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public String getFlights(
      @DefaultValue("") @QueryParam("country") String country,
      @DefaultValue("") @QueryParam("city") String city,
      @DefaultValue("01-01-2018") @QueryParam("date") String isoDate
  ) {
    try {
      SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
      Date date = formatter.parse(isoDate);
      ArrayList<Flight> flights = this.databaseMock.searchFlight(country, city,
          date);
      return parser.toJSON(flights);
    } catch (ParseException e) {
      e.printStackTrace();
      return parser.toJSON(e.getMessage());
    }
  }
}
