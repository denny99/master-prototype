package de.uni.frankfurt.test.selenium.exceptions;

/**
 * Exception fliegt wenn ein erwarteter Text nicht gefunden wurde.
 * <p>
 * Copyright (C) 2013 <a href="http://syntegris.de"
 * title="syntegris information solutions GmbH">syntegris information solutions
 * GmbH</a>
 * </p>
 *
 * @author Stefanie Reitter
 * @since 12.07.2013
 */
public class WantedTextNotFoundException extends RuntimeException {
  private static final long serialVersionUID = -6828860462767203892L;

  public WantedTextNotFoundException() {
    super();
  }

  public WantedTextNotFoundException(
      final String message, final Throwable cause) {
    super(message, cause);
  }

  public WantedTextNotFoundException(final String message) {
    super(message);
  }

  public WantedTextNotFoundException(final Throwable cause) {
    super(cause);
  }
}
