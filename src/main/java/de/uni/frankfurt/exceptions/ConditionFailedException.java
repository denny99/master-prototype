package de.uni.frankfurt.exceptions;

public class ConditionFailedException extends RestExceptionImpl {
    public ConditionFailedException(String message) {
        this(message, Object.class);
    }

    public ConditionFailedException(String message, Class clazz) {
        super(412, message, clazz);
    }
}
