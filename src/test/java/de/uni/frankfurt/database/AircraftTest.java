package de.uni.frankfurt.database;

import de.uni.frankfurt.exceptions.ResourceNotFoundException;
import de.uni.frankfurt.json.wrapper.JSONParser;
import org.apache.log4j.Logger;
import org.junit.Before;
import org.junit.Test;

public class AircraftTest {
  private static final Logger LOG = Logger.getLogger(AircraftTest.class);
  private JSONParser parser;
  private DatabaseMock database;

  @Before
  public void createParser() {
    this.parser = new JSONParser();
    this.database = new DatabaseMock();
  }

  @Test
  public void createJSON() throws ResourceNotFoundException {
  }
}