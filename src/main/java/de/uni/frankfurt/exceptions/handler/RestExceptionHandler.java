package de.uni.frankfurt.exceptions.handler;

import de.uni.frankfurt.beans.JSONParserBean;
import de.uni.frankfurt.exceptions.RestException;
import de.uni.frankfurt.json.exceptions.JsonSchemaException;
import org.apache.log4j.Logger;

import javax.inject.Inject;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * custom exception handler for JSON error responses
 */
abstract class RestExceptionHandler {
    private final static Logger LOGGER = Logger.getLogger(
            RestExceptionHandler.class);

    @Inject
    private JSONParserBean parser;

    public Response buildResponse(RestException ex) {
        String entity = "";
        try {
            entity = parser.toJSON(ex);
        } catch (JsonSchemaException e) {
            // should never happen otherwise we have an error in our BE logic
            LOGGER.error(e.toString());
        }
        return Response.status(ex.getStatusCode())
                .entity(entity)
                .type(MediaType.APPLICATION_JSON)
                .build();
    }
}