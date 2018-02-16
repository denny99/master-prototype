package de.uni.frankfurt.beans;

import de.uni.frankfurt.database.entity.Flight;

import javax.enterprise.context.RequestScoped;
import javax.inject.Named;

@Named
@RequestScoped
public class FlightDetailsBean {
  private Flight selectedFlight;

  public Flight getSelectedFlight() {
    return selectedFlight;
  }

  /**
   * init bean and show file
   * <p>
   * TODO obsolete
   *
   * @param flight clicked file
   * @return
   */
  public String viewFlight(Flight flight) {
    this.selectedFlight = flight;
    return "/pages/flightDetails";
  }
}
