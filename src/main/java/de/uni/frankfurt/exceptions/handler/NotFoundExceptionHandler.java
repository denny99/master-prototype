package de.uni.frankfurt.exceptions.handler;

import de.uni.frankfurt.exceptions.ResourceNotFoundException;

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
public class NotFoundExceptionHandler extends RestExceptionHandler implements ExceptionMapper<ResourceNotFoundException> {
    @Context
    private HttpHeaders headers;

    public Response toResponse(ResourceNotFoundException ex) {
        return this.buildResponse(ex);
    }
}