package de.uni.frankfurt.beans;


import de.uni.frankfurt.exceptions.adapter.BadRequestExceptionAdapter;
import de.uni.frankfurt.exceptions.adapter.ConditionFailedExceptionAdapter;
import de.uni.frankfurt.exceptions.adapter.ResourceNotFoundExceptionAdapter;
import de.uni.frankfurt.json.annotations.JsonField;
import de.uni.frankfurt.json.annotations.JsonObject;
import de.uni.frankfurt.json.exceptions.JsonSchemaException;
import org.apache.log4j.Logger;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Named;
import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;
import javax.json.bind.JsonbConfig;
import java.io.InputStream;
import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.lang.reflect.Type;
import java.util.*;

@Named
@ApplicationScoped
public class JSONParserBean {
  private static final Logger LOGGER = Logger.getLogger(JSONParserBean.class);
  private final Jsonb jsonb;
  private static HashMap<String, String> formats;

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

        // if field is annotated with @JsonField
        if (field.isAnnotationPresent(JsonField.class)) {
          Annotation annotation = field.getAnnotation(JsonField.class);
          JsonField schema = (JsonField) annotation;

          Object value = field.get(object);

          // required prop
          if (schema.required()) {
            if (value == null || (value instanceof String &&
                ((String) value).isEmpty())) {
              throw new JsonSchemaException(field.getName(), "is required");
            }
          }

          // value is null validation is not required
          if (value == null) {
            continue;
          }

          // max length prop
          if (schema.maxLength() != 0) {
            if (((String) value).length() > schema.maxLength()) {
              throw new JsonSchemaException(field.getName(),
                  String.format("is too long, max %d characters allowed",
                      schema.maxLength()));
            }
          }

          // min length
          if (schema.minLength() != 0) {
            if (((String) value).length() < schema.minLength()) {
              throw new JsonSchemaException(field.getName(),
                  String.format("is too short, min %d characters required",
                      schema.minLength()));
            }
          }

          // maximum
          if (schema.maximum() != 0) {
            // convert to double
            if (Double.valueOf(value.toString()) > schema.maximum()) {
              throw new JsonSchemaException(field.getName(),
                  String.format("is too big, max %f allowed",
                      schema.maximum()));
            }
          }

          // enum
          if (schema.enumerable().length != 0) {
            List<String> s = Arrays.asList(schema.enumerable());
            if (!s.contains(value.toString())) {
              throw new JsonSchemaException(field.getName(),
                  String.format("has no enum for %s. Only one of %s is allowed",
                      value.toString(), Arrays.toString(schema.enumerable())));
            }
          }

          // pattern
          if (!schema.pattern().isEmpty()) {
            if (!value.toString().matches(schema.pattern())) {
              throw new JsonSchemaException(field.getName(),
                  String.format("doesn't match the pattern %s",
                      schema.pattern()));
            }
          }

          // read only
          if (schema.readOnly()) {
            field.set(object, null);
          }

          // unique
          if (schema.uniqueItems()) {
            Iterable<Object> items = new ArrayList<>();
            if (value instanceof Object[]) {
              items = Arrays.asList((Object[]) value);
            } else if (value instanceof Iterable) {
              items = (Iterable<Object>) value;
            }

            HashSet<Object> set = new HashSet<>();
            for (Object o : items) {
              if (set.contains(o)) {
                throw new JsonSchemaException(field.getName(),
                    String.format("does not allow duplicate values (%s)",
                        o));
              } else {
                set.add(o);
              }
            }
          }

          // dependency
          if (schema.dependency().length != 0) {
            for (String s : schema.dependency()) {
              try {
                Field declaredField = object.getClass().getDeclaredField(s);
                if (declaredField.get(object) == null) {
                  throw new JsonSchemaException(field.getName(),
                      String.format("dependency is not fulfilled for %s",
                          declaredField.getName()));
                }
              } catch (NoSuchFieldException e) {
                // when this happens the dependency is not setup properly
                LOGGER.error(e.toString());
              }
            }

          }
        }
      }
    } catch (IllegalAccessException e) {
      e.printStackTrace();
    }
  }
}
