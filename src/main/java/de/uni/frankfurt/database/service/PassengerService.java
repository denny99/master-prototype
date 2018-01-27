package de.uni.frankfurt.database.service;

import de.uni.frankfurt.database.entity.Passenger;
import de.uni.frankfurt.exceptions.ResourceNotFoundException;
import org.apache.log4j.Logger;

import javax.enterprise.context.SessionScoped;
import javax.inject.Inject;
import javax.inject.Named;
import java.io.Serializable;
import java.util.ArrayList;

/**
 *
 */
@Named
@SessionScoped
public class PassengerService implements Serializable {
  private static final Logger LOG = Logger.getLogger(PassengerService.class);

  @Inject
  private DatabaseMock databaseMock;

  public ArrayList<Passenger> getPassengers() {
    return databaseMock.getPassengers();
  }

  /**
   * @param passengers passengers to create
   * @return created objects
   */
  public ArrayList<Passenger> createPassengers(
      ArrayList<Passenger> passengers) {
    // force random id
    ArrayList<Passenger> result = new ArrayList<Passenger>();
    for (Passenger p : passengers) {
      result.add(this.createPassenger(p));
    }
    return result;
  }

  /**
   * @param p passenger to create
   * @return created object
   */
  public Passenger createPassenger(Passenger p) {
    // force random id
    Passenger p1 = new Passenger(p.getName(), p.getIdCardNumber());
    this.databaseMock.addPassenger(p1);
    return p1;
  }

  /**
   * @param id id of passenger
   * @return found passenger
   * @throws ResourceNotFoundException id does not exist
   */
  public Passenger getPassengerById(
      String id) throws ResourceNotFoundException {
    for (Passenger passenger : this.databaseMock.getPassengers()) {
      if (passenger.getId().equals(id)) {
        return passenger;
      }
    }
    throw new ResourceNotFoundException(id, Passenger.class);
  }

  /**
   * @param id id card number
   * @return returns a list of all passenger containing the given number (autocomplete)
   */
  public ArrayList<Passenger> getPassengersByIdCardNumber(
      String id) {
    ArrayList<Passenger> passengers = new ArrayList<Passenger>();
    for (Passenger passenger : this.databaseMock.getPassengers()) {
      if (passenger.getIdCardNumber()
          .toLowerCase()
          .contains(id.toLowerCase())) {
        passengers.add(passenger);
      }
    }
    return passengers;
  }
}
