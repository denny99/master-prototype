package de.uni.frankfurt.test.selenium.exceptions;

/**
 * Exception fliegt wenn ein vorher selektiertes Elemnt nicht selektiert ist
 * (Wenn das selektieren nicht geklappt hat)
 * <p>
 * Copyright (C) 2013 <a href="http://syntegris.de"
 * title="syntegris information solutions GmbH">syntegris information solutions
 * GmbH</a>
 * </p>
 *
 * @author Stefanie Reitter
 * @since 12.07.2013
 */
public class ElementNotSelectedException extends RuntimeException {
  private static final long serialVersionUID = -6828860462767203892L;

  public ElementNotSelectedException() {
    super();
  }

  public ElementNotSelectedException(
      final String message, final Throwable cause) {
    super(message, cause);
  }

  public ElementNotSelectedException(final String message) {
    super(message);
  }

  public ElementNotSelectedException(final Throwable cause) {
    super(cause);
  }
}
