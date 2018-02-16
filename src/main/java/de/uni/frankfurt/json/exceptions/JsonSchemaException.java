package de.uni.frankfurt.json.exceptions;

public class JsonSchemaException extends Throwable {
  private final String field;
  private final String reason;

  public JsonSchemaException(String fieldName, String reason) {
    this.field = fieldName;
    this.reason = reason;
  }

  public String getField() {
    return field;
  }

  public String getReason() {
    return reason;
  }
}
