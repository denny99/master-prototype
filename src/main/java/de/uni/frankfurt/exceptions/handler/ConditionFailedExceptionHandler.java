package de.uni.frankfurt.exceptions.handler;

import de.uni.frankfurt.exceptions.ConditionFailedException;

import javax.enterprise.context.ApplicationScoped;
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
public class ConditionFailedExceptionHandler extends RestExceptionHandler implements ExceptionMapper<ConditionFailedException> {

  @Context
  private HttpHeaders headers;

  public Response toResponse(ConditionFailedException ex) {
    return this.buildResponse(ex);
  }
}