package de.uni.frankfurt.json.wrapper;

import de.uni.frankfurt.json.adapter.ResourceNotFoundExceptionAdapter;
import de.uni.frankfurt.json.deserializer.AircraftDeserializer;
import de.uni.frankfurt.json.deserializer.AirportDeserializer;
import de.uni.frankfurt.json.deserializer.FlightDeserializer;
import de.uni.frankfurt.json.deserializer.PassengerDeserializer;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Named;
import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;
import javax.json.bind.JsonbConfig;
import java.lang.reflect.Type;

@Named
@ApplicationScoped
public class JSONParser {
  private final Jsonb jsonb;

  public JSONParser() {
    JsonbConfig config = new JsonbConfig()
        .withFormatting(true)
        .withAdapters(new ResourceNotFoundExceptionAdapter())
        .withDeserializers(new AircraftDeserializer(),
            new AirportDeserializer(), new FlightDeserializer(),
            new PassengerDeserializer());

    this.jsonb = JsonbBuilder.create(config);
  }

  public <T> T fromJSON(String s, Type clazz) {
    return this.jsonb.fromJson(s, clazz);
  }

  public <T> T fromJSON(String s, Class<T> clazz) {
    return this.jsonb.fromJson(s, clazz);
  }

  public String toJSON(Object o) {
    return this.jsonb.toJson(o);
  }

  public String toJSON(Object o, Type type) {
    return this.jsonb.toJson(o, type);
  }
}
