package de.uni.frankfurt.beans;

import de.uni.frankfurt.database.DatabaseMock;
import de.uni.frankfurt.database.Flight;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.inject.Named;
import java.util.ArrayList;

@Named
@RequestScoped
public class FlightOverviewBean {
  @Inject
  private DatabaseMock databaseMock;

  public ArrayList<Flight> getFlights() {
    return databaseMock.getFlights();
  }
}
