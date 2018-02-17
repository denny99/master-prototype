package de.uni.frankfurt.swagger;

import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.introspect.Annotated;
import com.fasterxml.jackson.databind.introspect.AnnotatedClass;
import com.fasterxml.jackson.databind.introspect.AnnotatedField;
import de.uni.frankfurt.json.annotations.JsonObject;
import de.uni.frankfurt.json.annotations.JsonSchema;
import io.swagger.v3.core.converter.ModelConverterContext;
import io.swagger.v3.core.jackson.ModelResolver;
import io.swagger.v3.oas.models.media.Discriminator;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class JsonSchemaConverter extends ModelResolver {
  public JsonSchemaConverter(ObjectMapper mapper) {
    super(mapper);
  }

  @Override
  protected String resolveDescription(
      Annotated ann) {
    return super.resolveDescription(ann);
  }

  @Override
  protected String resolveTitle(
      Annotated a) {
    return super.resolveTitle(a);
  }

  @Override
  protected String resolveFormat(
      Annotated a) {
    return super.resolveFormat(a);
  }

  @Override
  protected Boolean resolveReadOnly(
      Annotated a) {
    return super.resolveReadOnly(a);
  }

  @Override
  protected Boolean resolveNullable(
      Annotated a) {
    return super.resolveNullable(a);
  }

  @Override
  protected BigDecimal resolveMultipleOf(
      Annotated a) {
    return super.resolveMultipleOf(a);
  }

  @Override
  protected Integer resolveMaxLength(
      Annotated a) {
    if (a.hasAnnotation(JsonSchema.class)) {
      JsonSchema schema = a.getAnnotation(JsonSchema.class);
      return schema.maxLength() == 0 ? null : schema.maxLength();
    }
    return super.resolveMaxLength(a);
  }

  @Override
  protected Integer resolveMinLength(
      Annotated a) {
    return super.resolveMinLength(a);
  }

  @Override
  protected BigDecimal resolveMinimum(
      Annotated a) {
    return super.resolveMinimum(a);
  }

  @Override
  protected BigDecimal resolveMaximum(
      Annotated a) {
    return super.resolveMaximum(a);
  }

  @Override
  protected Boolean resolveExclusiveMinimum(
      Annotated a) {
    return super.resolveExclusiveMinimum(a);
  }

  @Override
  protected Boolean resolveExclusiveMaximum(
      Annotated a) {
    return super.resolveExclusiveMaximum(a);
  }

  @Override
  protected String resolvePattern(
      Annotated a) {
    return super.resolvePattern(a);
  }

  @Override
  protected Integer resolveMinProperties(
      Annotated a) {
    return super.resolveMinProperties(a);
  }

  @Override
  protected Integer resolveMaxProperties(
      Annotated a) {
    return super.resolveMaxProperties(a);
  }

  @Override
  protected List<String> resolveRequiredProperties(
      Annotated a) {
    // only json schema annotated object
    if (a.hasAnnotation(JsonObject.class)) {
      ArrayList<String> result = new ArrayList<>();
      // iterate over props
      for (AnnotatedField annotatedField : ((AnnotatedClass) a).fields()) {
        // every annotated json schema prop
        if (annotatedField.hasAnnotation(JsonSchema.class)) {
          JsonSchema schema = annotatedField.getAnnotation(JsonSchema.class);
          // add to required list when annotated with required
          if (schema.required()) {
            result.add(annotatedField.getName());
          }
        }
      }
      return result;
    }
    return super.resolveRequiredProperties(a);
  }

  @Override
  protected Boolean resolveWriteOnly(
      Annotated a) {
    return super.resolveWriteOnly(a);
  }

  @Override
  protected List<String> resolveAllowableValues(
      Annotated a) {
    return super.resolveAllowableValues(a);
  }

  @Override
  protected Discriminator resolveDiscriminator(
      JavaType type, ModelConverterContext context) {
    return super.resolveDiscriminator(type, context);
  }
}