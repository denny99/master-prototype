package de.uni.frankfurt.exceptions;

public class RestExceptionImpl extends Throwable implements RestException {
    private int statusCode;
    private String errorMessage;
    private String type;

    public RestExceptionImpl() {
    }

    RestExceptionImpl(int statusCode, String errorMessage, Class clazz) {
        this.errorMessage = errorMessage;
        this.statusCode = statusCode;
        this.type = clazz.getSimpleName();
    }

    @Override
    public int getStatusCode() {
        return statusCode;
    }

    @Override
    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }

    @Override
    public String getErrorMessage() {
        return errorMessage;
    }

    @Override
    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    @Override
    public String getType() {
        return type;
    }

    @Override
    public void setType(String type) {
        this.type = type;
    }
}
