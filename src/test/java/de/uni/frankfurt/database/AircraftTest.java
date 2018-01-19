package de.uni.frankfurt.database;

import de.uni.frankfurt.exceptions.ResourceNotFoundException;
import de.uni.frankfurt.json.JSONParser;
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
    LOG.info(parser.getJsonb().toJson(new Aircraft("1", "1", "2", 3)));
    String s = parser.getJsonb().toJson(database.getFlightById("1"));
    LOG.info(s);
  }
}