package de.uni.frankfurt.exceptions;

import de.uni.frankfurt.json.wrapper.JSONParser;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

/**
 * custom exception handler for JSON error responses
 */
@Provider
@ApplicationScoped
public class NotFoundExceptionHandler implements ExceptionMapper<ResourceNotFoundException> {

  @Inject
  private JSONParser parser;

  @Context
  private HttpHeaders headers;

  public Response toResponse(ResourceNotFoundException ex) {
    return Response.status(404)
        .entity(parser.toJSON(ex))
        .type(MediaType.APPLICATION_JSON)
        .build();
  }
}