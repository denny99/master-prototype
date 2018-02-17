package de.uni.frankfurt.exceptions.handler;

import de.uni.frankfurt.beans.JSONParserBean;
import de.uni.frankfurt.exceptions.RestException;

import javax.inject.Inject;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * custom exception handler for JSON error responses
 */
abstract class RestExceptionHandler {

  @Inject
  private JSONParserBean parser;

  public Response buildResponse(RestException ex) {

    return Response.status(ex.getStatusCode())
        .entity(parser.toJSON(ex))
        .type(MediaType.APPLICATION_JSON)
        .build();
  }
}