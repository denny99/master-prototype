package de.uni.frankfurt.test.selenium.exceptions;

/**
 * Exception fliegt wenn ein gesuchtes Element nicht dargestellt wird
 * <p>
 * Copyright (C) 2013 <a href="http://syntegris.de"
 * title="syntegris information solutions GmbH">syntegris information solutions
 * GmbH</a>
 * </p>
 *
 * @author Stefanie Reitter
 * @since 12.07.2013
 */
public class ElementNotDisplayedException extends RuntimeException {
    private static final long serialVersionUID = -6828860462767203892L;

    public ElementNotDisplayedException() {
        super();
    }

    public ElementNotDisplayedException(
            final String message, final Throwable cause) {
        super(message, cause);
    }

    public ElementNotDisplayedException(final String message) {
        super(message);
    }

    public ElementNotDisplayedException(final Throwable cause) {
        super(cause);
    }
}
