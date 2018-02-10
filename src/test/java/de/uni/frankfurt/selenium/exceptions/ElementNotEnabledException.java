package de.uni.frankfurt.selenium.exceptions;

/**
 * Exception fliegt wenn ein gesuchtes Element disabled ist
 * <p>
 * Copyright (C) 2013 <a href="http://syntegris.de"
 * title="syntegris information solutions GmbH">syntegris information solutions
 * GmbH</a>
 * </p>
 *
 * @author Stefanie Reitter
 * @since 12.07.2013
 */
public class ElementNotEnabledException extends RuntimeException {
  private static final long serialVersionUID = -6828860462767203892L;

  public ElementNotEnabledException() {
    super();
  }

  public ElementNotEnabledException(
      final String message, final Throwable cause) {
    super(message, cause);
  }

  public ElementNotEnabledException(final String message) {
    super(message);
  }

  public ElementNotEnabledException(final Throwable cause) {
    super(cause);
  }
}
