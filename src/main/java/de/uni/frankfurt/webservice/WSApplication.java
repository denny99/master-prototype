package de.uni.frankfurt.webservice;

import de.uni.frankfurt.swagger.JsonSchemaConverter;
import io.swagger.v3.core.converter.ModelConverters;
import io.swagger.v3.core.util.Json;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

@ApplicationPath("api")
public class WSApplication extends Application {
  public WSApplication() {
    ModelConverters.getInstance().addConverter(new JsonSchemaConverter(
        Json.mapper()));
  }
}
