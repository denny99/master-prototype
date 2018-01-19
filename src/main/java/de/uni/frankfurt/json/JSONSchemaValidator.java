package de.uni.frankfurt.json;

import de.uni.frankfurt.json.annotations.JsonSchema;

import java.lang.annotation.Annotation;
import java.lang.reflect.Field;

abstract class JSONSchemaValidator {

  protected boolean validateSchema(
      Object object) {
    // TODO iterate ove object props and check annotations
    Class<?> objectClass = object.getClass();
    for (Field field : objectClass.getDeclaredFields()) {

      // if field is annotated with @JsonSchema
      if (field.isAnnotationPresent(JsonSchema.class)) {

        Annotation annotation = field.getAnnotation(JsonSchema.class);
        JsonSchema test = (JsonSchema) annotation;

        // TODO grab getter and validate something
        if (test.required()) {

        }

      }

    }
    return true;
  }
}
