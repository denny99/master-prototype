package de.uni.frankfurt.exceptions;

public class ResourceNotFoundException extends RestException {
  private final int statusCode;
  private final String errorMessage;


  public ResourceNotFoundException(String id) {
    this.statusCode = 404;
    this.errorMessage = "Resource not found: " + id;
  }

  public int getStatusCode() {
    return statusCode;
  }

  public String getErrorMessage() {
    return errorMessage;
  }
}
