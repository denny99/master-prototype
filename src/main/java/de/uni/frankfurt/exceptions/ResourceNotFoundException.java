package de.uni.frankfurt.exceptions;

public class ResourceNotFoundException extends RestException {
  public ResourceNotFoundException(String id, Class clazz) {
    super(404, "Resource not found: " + id, clazz);
  }
}
