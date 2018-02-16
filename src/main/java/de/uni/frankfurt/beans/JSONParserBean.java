package de.uni.frankfurt.beans;


import de.uni.frankfurt.adapter.BadRequestExceptionAdapter;
import de.uni.frankfurt.adapter.ConditionFailedExceptionAdapter;
import de.uni.frankfurt.adapter.ResourceNotFoundExceptionAdapter;
import de.uni.frankfurt.json.annotations.JsonObject;
import de.uni.frankfurt.json.annotations.JsonSchema;
import de.uni.frankfurt.json.exceptions.JsonSchemaException;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Named;
import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;
import javax.json.bind.JsonbConfig;
import java.io.InputStream;
import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.lang.reflect.Type;

@Named
@ApplicationScoped
public class JSONParserBean {
  private final Jsonb jsonb;

  public JSONParserBean() {
    this.jsonb = JsonbBuilder.create(new JsonbConfig()
        .withFormatting(true)
        .withAdapters(new BadRequestExceptionAdapter(),
            new ConditionFailedExceptionAdapter(),
            new ResourceNotFoundExceptionAdapter()));
  }

  public <T> T fromJSON(String s, Type clazz) throws JsonSchemaException {
    T o = this.jsonb.fromJson(s, clazz);
    this.validateSchema(o);
    return o;
  }

  public <T> T fromJSON(String s, Class<T> clazz) throws JsonSchemaException {
    T o = this.jsonb.fromJson(s, clazz);
    this.validateSchema(o);
    return o;
  }

  public <T> T fromJSON(
      InputStream entityStream, Type genericType) throws JsonSchemaException {
    T o = this.jsonb.fromJson(entityStream, genericType);
    this.validateSchema(o);
    return o;
  }

  public String toJSON(Object o) {
    return this.jsonb.toJson(o);
  }

  public String toJSON(Object o, Type type) {
    return this.jsonb.toJson(o, type);
  }

  private <T> void validateSchema(
      T object) throws JsonSchemaException {
    // TODO iterate over object props and check annotations
    if (!object.getClass().isAnnotationPresent(JsonObject.class)) {
      return;
    }

    try {
      for (Field field : object.getClass().getDeclaredFields()) {
        field.setAccessible(true);
        // is an object with own properties?
        if (field.getType().isAnnotationPresent(JsonObject.class)) {
          this.validateSchema(field.get(object));
          continue;
        }

        // if field is annotated with @JsonSchema
        if (field.isAnnotationPresent(JsonSchema.class)) {
          Annotation annotation = field.getAnnotation(JsonSchema.class);
          JsonSchema schema = (JsonSchema) annotation;

          // TODO grab getter and validate something
          Object value = field.get(object);

          // required prop
          if (schema.required()) {
            if (value == null) {
              throw new JsonSchemaException(field.getName(), "is required");
            }
          }

          // max length prop
          if (schema.maxLength() != 0) {
            if (((String) value).length() >= schema.maxLength()) {
              throw new JsonSchemaException(field.getName(),
                  String.format("is too long, max %d characters allowed",
                      schema.maxLength()));
            }
          }

        }
      }
    } catch (IllegalAccessException e) {
      e.printStackTrace();
    }
  }
}
