package de.uni.frankfurt.json.deserializer;

import de.uni.frankfurt.database.Passenger;
import de.uni.frankfurt.json.schema.JSONSchemaValidator;
import org.apache.log4j.Logger;

import javax.json.bind.serializer.DeserializationContext;
import javax.json.bind.serializer.JsonbDeserializer;
import javax.json.stream.JsonParser;
import java.lang.reflect.Type;

public class PassengerDeserializer extends JSONSchemaValidator implements JsonbDeserializer<Passenger> {
  private static final Logger LOG = Logger.getLogger(
      PassengerDeserializer.class);

  @Override
  public Passenger deserialize(
      JsonParser jsonParser, DeserializationContext deserializationContext,
      Type type) {
    LOG.info("hello");
    Passenger p = deserializationContext.deserialize(Passenger.class,
        jsonParser);

    if (this.validateSchema(p)) {
      return p;
    } else {
      return null;
    }
  }
}
