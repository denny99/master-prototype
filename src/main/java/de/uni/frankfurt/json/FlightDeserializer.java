package de.uni.frankfurt.json;

import de.uni.frankfurt.database.Flight;

import javax.json.bind.serializer.DeserializationContext;
import javax.json.bind.serializer.JsonbDeserializer;
import javax.json.stream.JsonParser;
import java.lang.reflect.Type;

public class FlightDeserializer extends JSONSchemaValidator implements JsonbDeserializer<Flight> {
  @Override
  public Flight deserialize(
      JsonParser jsonParser, DeserializationContext deserializationContext,
      Type type) {
    if (!this.validateSchema(jsonParser)) {
      return null;
    }
    return deserializationContext.deserialize(Flight.class, jsonParser);
  }
}
