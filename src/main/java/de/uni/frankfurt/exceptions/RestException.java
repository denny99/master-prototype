package de.uni.frankfurt.exceptions;

import javax.json.bind.annotation.JsonbTransient;

public class RestException extends Throwable {

  @JsonbTransient
  @Override
  public StackTraceElement[] getStackTrace() {
    return super.getStackTrace();
  }
}
