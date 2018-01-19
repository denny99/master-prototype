package de.uni.frankfurt.json;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Named;
import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;
import javax.json.bind.JsonbConfig;

@Named
@ApplicationScoped
public class JSONParser {
  private final Jsonb jsonb;

  public JSONParser() {
    JsonbConfig config = new JsonbConfig()
        .withFormatting(true)
        .withDeserializers(new AircraftDeserializer(),
            new AirportDeserializer(), new FlightDeserializer(),
            new PassengerDeserializer());

    this.jsonb = JsonbBuilder.create(config);
  }

  public String toJSON(Object o) {
    return this.jsonb.toJson(o);
  }

  public <T> T fromJSON(String s, Class<T> clazz) {
    return this.jsonb.fromJson(s, clazz);
  }
}
