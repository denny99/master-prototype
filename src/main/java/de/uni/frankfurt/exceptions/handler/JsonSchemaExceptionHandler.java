package de.uni.frankfurt.exceptions.handler;

import de.uni.frankfurt.exceptions.BadRequestException;
import de.uni.frankfurt.json.exceptions.JsonSchemaException;

import javax.enterprise.context.ApplicationScoped;
import javax.json.Json;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

/**
 * custom exception handler for JSON error responses
 */
@Provider
@ApplicationScoped
public class JsonSchemaExceptionHandler extends RestExceptionHandler implements ExceptionMapper<JsonSchemaException> {

  @Context
  private HttpHeaders headers;

  public Response toResponse(JsonSchemaException ex) {
    BadRequestException e = new BadRequestException(
        ex.getField() + ": " + ex.getReason(), Json.class);
    return this.buildResponse(e);
  }
}