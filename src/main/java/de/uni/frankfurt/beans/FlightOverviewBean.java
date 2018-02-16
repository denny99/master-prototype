package de.uni.frankfurt.beans;

import de.uni.frankfurt.database.entity.Flight;
import de.uni.frankfurt.database.service.FlightService;

import javax.enterprise.context.SessionScoped;
import javax.faces.model.SelectItem;
import javax.inject.Inject;
import javax.inject.Named;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Named
@SessionScoped
public class FlightOverviewBean implements Serializable {
  private final ArrayList<SelectItem> options = new ArrayList<SelectItem>();
  @Inject
  private FlightService flightService;
  private boolean searched;
  private String arrivalFilter;
  private List<Flight> searchResults = new ArrayList<Flight>();
  private String sortOrder;

  public FlightOverviewBean() {
    options.add(new SelectItem("asc", "Ascending"));
    options.add(new SelectItem("desc", "Descending"));
  }

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

  public String getSortOrder() {
    return sortOrder;
  }

  public void setSortOrder(String sortOrder) {
    this.sortOrder = sortOrder;
  }

  public List<SelectItem> getSortOptions() {
    return options;
  }

  /**
   * basic search query for datatable
   * <p>
   * get flights rest route
   *
   * @return nothing
   * @ flightOverview:flightFilterInput
   */
  public String searchFlight() {
    searched = true;
    searchResults = flightService.searchFlight(100000, 0, "DE",
        this.arrivalFilter,
        new Date(), this.sortOrder);
    return null;
  }
}
