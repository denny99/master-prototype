package de.uni.frankfurt.swagger;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.introspect.Annotated;
import de.uni.frankfurt.json.annotations.JsonSchema;
import io.swagger.v3.core.jackson.ModelResolver;

public class JsonSchemaConverter extends ModelResolver {
  public JsonSchemaConverter(ObjectMapper mapper) {
    super(mapper);
  }

  @Override
  protected Integer resolveMaxLength(
      Annotated a) {
    if (a.hasAnnotation(JsonSchema.class)) {
      JsonSchema schema = a.getAnnotation(JsonSchema.class);
      return schema.maxLength();
    }
    return super.resolveMaxLength(a);
  }
}