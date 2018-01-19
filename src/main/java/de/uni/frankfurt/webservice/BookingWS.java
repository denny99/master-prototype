package de.uni.frankfurt.webservice;

import de.uni.frankfurt.database.Booking;
import de.uni.frankfurt.database.DatabaseMock;
import de.uni.frankfurt.exceptions.ResourceNotFoundException;
import de.uni.frankfurt.json.JSONParser;
import org.apache.log4j.Logger;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

@Path("/bookings")
@RequestScoped
public class BookingWS {
  private static final Logger LOG = Logger.getLogger(BookingWS.class);

  @Inject
  private DatabaseMock databaseMock;

  @Inject
  private JSONParser parser;

  BookingWS() {
  }

  @Path("/")
  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public String getPassengers() {
    return parser.toJSON(databaseMock.getBookings());
  }

  @Path("/{bookingId}")
  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public String getPassengerById(
      @PathParam("bookingId") String id
  ) throws ResourceNotFoundException {
    return parser.toJSON(databaseMock.getBookingById(id));
  }

  @Path("/")
  @POST
  @Consumes(MediaType.APPLICATION_JSON)
  public String createPassenger(
      String bookingJSON) throws ResourceNotFoundException {
    Booking b = databaseMock.createBooking(
        parser.fromJSON(bookingJSON, Booking.class));
    return parser.toJSON(b);
  }
}
