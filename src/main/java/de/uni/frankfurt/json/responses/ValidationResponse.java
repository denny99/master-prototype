package de.uni.frankfurt.json.responses;

public class ValidationResponse {
  private Boolean error;
  private String messsage;

  public ValidationResponse(Boolean error, String message) {
    this.error = error;
    this.messsage = message;
  }

  public Boolean hasError() {
    return error;
  }

  public void setError(Boolean error) {
    this.error = error;
  }

  public String getMesssage() {
    return messsage;
  }

  public void setMesssage(String messsage) {
    this.messsage = messsage;
  }
}
