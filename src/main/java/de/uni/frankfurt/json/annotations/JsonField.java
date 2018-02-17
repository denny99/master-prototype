package de.uni.frankfurt.json.annotations;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * annotate the actual fields to set json schema props
 */
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.FIELD})
public @interface JsonField {
  String[] dependency() default {};

  String description() default "";

  String[] enumerable() default {};

  int maxLength() default 0;

  double maximum() default 0;

  int minLength() default 0;

  String pattern() default "";

  boolean readOnly() default false;

  boolean required() default false;

  String title() default "";

  boolean uniqueItems() default false;
}
