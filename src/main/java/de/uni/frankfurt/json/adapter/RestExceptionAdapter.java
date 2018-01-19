package de.uni.frankfurt.json.adapter;

import de.uni.frankfurt.exceptions.RestException;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.bind.adapter.JsonbAdapter;

public class RestExceptionAdapter<T extends RestException> implements JsonbAdapter<T, JsonObject> {
  @Override
  public JsonObject adaptToJson(T c) {
    return Json.createObjectBuilder()
        .add("type", c.getType())
        .add("message", c.getErrorMessage())
        .add("code", c.getStatusCode())
        .build();
  }

  /**
   * not used. exceptions are output only
   *
   * @param jsonObject json Object
   * @return nothing
   */
  @Override
  public T adaptFromJson(JsonObject jsonObject) {
    return null;
  }
}
