package de.uni.frankfurt.beans;

import de.uni.frankfurt.database.entity.Flight;
import de.uni.frankfurt.database.service.FlightService;

import javax.enterprise.context.SessionScoped;
import javax.inject.Inject;
import javax.inject.Named;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Named
@SessionScoped
public class FlightOverviewBean implements Serializable {
  @Inject
  private FlightService flightService;
  private boolean searched;
  private String arrivalFilter;
  private List<Flight> searchResults = new ArrayList<Flight>();

  public List<Flight> getSearchResults() {
    return searchResults;
  }

  public boolean isSearched() {
    return searched;
  }

  public String getArrivalFilter() {
    return arrivalFilter;
  }

  public void setArrivalFilter(String arrivalFilter) {
    this.arrivalFilter = arrivalFilter;
  }

  /**
   * basic search query for datatable
   *
   * @return nothing
   * @ flightOverview:flightFilterInput
   */
  public String searchFlight() {
    searched = true;
    searchResults = flightService.searchFlight(100000, 0, "DE",
        this.arrivalFilter,
        new Date());
    return null;
  }
}
