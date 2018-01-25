package de.uni.frankfurt.beans;

import de.uni.frankfurt.database.Flight;

import javax.enterprise.context.RequestScoped;
import javax.inject.Named;

@Named
@RequestScoped
public class FlightDetailsBean {
  private Flight selectedFlight;

  public String viewFlight(Flight flight) {
    this.selectedFlight = flight;
    return "pages/flightDetails";
  }
}
