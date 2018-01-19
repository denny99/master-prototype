package de.uni.frankfurt.json;

import de.uni.frankfurt.database.Aircraft;

import javax.json.bind.serializer.DeserializationContext;
import javax.json.bind.serializer.JsonbDeserializer;
import javax.json.stream.JsonParser;
import java.lang.reflect.Type;

public class AircraftDeserializer extends JSONSchemaValidator implements JsonbDeserializer<Aircraft> {
  @Override
  public Aircraft deserialize(
      JsonParser jsonParser, DeserializationContext deserializationContext,
      Type type) {
    if (!this.validateSchema(jsonParser)) {
      return null;
    }
    return deserializationContext.deserialize(Aircraft.class, jsonParser);
  }
}
