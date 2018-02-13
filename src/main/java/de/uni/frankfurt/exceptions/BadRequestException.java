package de.uni.frankfurt.exceptions;


public class BadRequestException extends RestException {
  public BadRequestException(String reason, Class clazz) {
    super(400, "Invalid Request Data:" + reason, clazz);
  }
}
