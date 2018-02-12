package de.uni.frankfurt.json.wrapper;

import de.uni.frankfurt.exceptions.RestException;

import javax.ws.rs.core.Response;
import java.lang.reflect.Type;

public class APIResponse<T> {
  private final T responseObject;
  private final RestException error;

  public APIResponse(Response response, Class<T> clazz) {
    if (this.isErrorResponse(response)) {
      this.error = response.readEntity(RestException.class);
      this.responseObject = null;
    } else {
      this.responseObject = response.readEntity(clazz);
      this.error = null;
    }
  }

  public APIResponse(Response response, Type type) {
    JSONParser parser = new JSONParser();
    if (this.isErrorResponse(response)) {
      this.error = response.readEntity(RestException.class);
      this.responseObject = null;
    } else {
      String json = response.readEntity(String.class);
      this.responseObject = parser.fromJSON(json, type);
      this.error = null;
    }
  }

  /**
   * check if status code is error code
   *
   * @param response api response
   * @return true = error
   */
  private boolean isErrorResponse(Response response) {
    return response.getStatus() != 200 && response.getStatus() != 201;
  }

  public T getResponseObject() {
    return responseObject;
  }

  public RestException getError() {
    return error;
  }

  public boolean hasError() {
    return this.error != null;
  }
}
