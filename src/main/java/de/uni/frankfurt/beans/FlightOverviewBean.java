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
  private boolean searched = true;
  private Object arrivalFilter;

  public ArrayList<Flight> getFlights() {
    return databaseMock.getFlights();
  }

  public boolean isSearched() {
    return searched;
  }

  public void setSearched(boolean searched) {
    this.searched = searched;
  }

  public Object getFilter() {
    return arrivalFilter;
  }

  public void setArrivalFilter(Object arrivalFilter) {
    this.arrivalFilter = arrivalFilter;
  }

  public String searchFlight() {
    //searched = true;
    return null;
  }
}
