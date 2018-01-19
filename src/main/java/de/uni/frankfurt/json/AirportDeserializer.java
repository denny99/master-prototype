package de.uni.frankfurt.json;

import de.uni.frankfurt.database.Airport;

import javax.json.bind.serializer.DeserializationContext;
import javax.json.bind.serializer.JsonbDeserializer;
import javax.json.stream.JsonParser;
import java.lang.reflect.Type;

public class AirportDeserializer extends JSONSchemaValidator implements JsonbDeserializer<Airport> {
  @Override
  public Airport deserialize(
      JsonParser jsonParser, DeserializationContext deserializationContext,
      Type type) {
    if (!this.validateSchema(jsonParser)) {
      return null;
    }
    return deserializationContext.deserialize(Airport.class, jsonParser);
  }
}
