package de.uni.frankfurt.exceptions;

public class RestException extends Throwable {
  private int statusCode;
  private String errorMessage;
  private String type;

  RestException(int statusCode, String errorMessage, Class clazz) {
    this.errorMessage = errorMessage;
    this.statusCode = statusCode;
    this.type = clazz.getSimpleName();
  }

  public int getStatusCode() {
    return statusCode;
  }

  public void setStatusCode(int statusCode) {
    this.statusCode = statusCode;
  }

  public String getErrorMessage() {
    return errorMessage;
  }

  public void setErrorMessage(String errorMessage) {
    this.errorMessage = errorMessage;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }
}
