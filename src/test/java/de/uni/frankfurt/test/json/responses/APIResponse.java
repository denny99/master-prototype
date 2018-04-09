package de.uni.frankfurt.test.json.responses;

import de.uni.frankfurt.beans.JSONParserBean;
import de.uni.frankfurt.exceptions.RestException;
import de.uni.frankfurt.exceptions.RestExceptionImpl;
import de.uni.frankfurt.json.exceptions.JsonSchemaException;

import javax.ws.rs.core.Response;
import java.lang.reflect.Type;

public class APIResponse<T> {
    private final T responseObject;
    private final RestException error;

    public APIResponse(Response response, Class<T> clazz) {
        if (this.isErrorResponse(response)) {
            this.error = response.readEntity(RestExceptionImpl.class);
            this.responseObject = null;
        } else {
            this.responseObject = response.readEntity(clazz);
            this.error = null;
        }
    }

    public APIResponse(Response response, Type type) throws JsonSchemaException {
        JSONParserBean parser = new JSONParserBean();
        if (this.isErrorResponse(response)) {
            this.error = response.readEntity(RestExceptionImpl.class);
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
