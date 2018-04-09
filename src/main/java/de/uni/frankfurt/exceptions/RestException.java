package de.uni.frankfurt.exceptions;

public interface RestException {
    // pseudo attributes just for swagger otherwise
    // every throwable attribute is added to the docs
    int statusCode = 400;
    String errorMessage = "";
    String type = "";

    int getStatusCode();

    void setStatusCode(int statusCode);

    String getErrorMessage();

    void setErrorMessage(String message);

    String getType();

    void setType(String type);
}
