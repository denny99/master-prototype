package de.uni.frankfurt.database.service;

import de.uni.frankfurt.database.entity.Flight;
import de.uni.frankfurt.exceptions.ResourceNotFoundException;
import org.apache.log4j.Logger;

import javax.enterprise.context.SessionScoped;
import javax.inject.Inject;
import javax.inject.Named;
import java.io.Serializable;
import java.util.*;

/**
 *
 */
@Named
@ApplicationScoped
public class FlightService implements Serializable {
  private static final Logger LOG = Logger.getLogger(FlightService.class);

  @Inject
  private DatabaseMock databaseMock;

  public ArrayList<Flight> getFlights() {
    return databaseMock.getFlights();
  }

  /**
   * @param id id of flight
   * @return Flight
   * @throws ResourceNotFoundException 404 when missing
   */
  public Flight getFlightById(String id) throws ResourceNotFoundException {
    for (Flight flight : this.databaseMock.getFlights()) {
      if (flight.getId().equals(id)) {
        return flight;
      }
    }
    throw new ResourceNotFoundException(id, Flight.class);
  }

  /**
   * @param limit     max number of results
   * @param offset    number of results to skip
   * @param country   Target Country
   * @param city      Target City
   * @param date      min. Date for flight
   * @param sortOrder date sort order
   * @return found results
   */
  public List<Flight> searchFlight(
      int limit, int offset, String country, String city, Date date,
      final String sortOrder) {
    List<Flight> results = new ArrayList<Flight>();
    for (Flight flight : this.databaseMock.getFlights()) {
      if (flight.getArrival().matchesCountry(country) &&
          flight.getArrival().matchesCity(city) &&
          flight.getDateTime().after(date)) {
        results.add(flight);
      }
    }
    if (results.size() > limit) {
      results = results.subList(offset,
          Math.min(offset + limit, results.size()));
    }

    Collections.sort(results, new Comparator<Flight>() {
      @Override
      public int compare(Flight lhs, Flight rhs) {
        int compareValue = lhs.getDateTime().compareTo(rhs.getDateTime());
        return sortOrder.equals("asc") ? compareValue : compareValue * -1;
      }
    });

    return results;
  }
}
