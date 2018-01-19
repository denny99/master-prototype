package de.uni.frankfurt.exceptions;

public class RestException extends Throwable {
  private final int statusCode;
  private final String errorMessage;
  private final String type;

  RestException(int statusCode, String errorMessage, Class clazz) {
    this.errorMessage = errorMessage;
    this.statusCode = statusCode;
    this.type = clazz.getSimpleName();
  }

  public int getStatusCode() {
    return statusCode;
  }

  public String getErrorMessage() {
    return errorMessage;
  }

  public String getType() {
    return type;
  }
}
