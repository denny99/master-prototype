package de.uni.frankfurt.json.responses;

public class ValidationResponse {
    private Boolean error;
    private String message;

    public ValidationResponse() {
    }

    public ValidationResponse(Boolean error, String message) {
        this.error = error;
        this.message = message;
    }

    public Boolean getError() {
        return error;
    }

    public void setError(Boolean error) {
        this.error = error;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
